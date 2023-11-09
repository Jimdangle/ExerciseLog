const User = require('../models/mUsers.js')
const {Workout} = require('../models/mWorkout.js');
const MuscleInformation = require('../config/Muscles.js').MuscleInformation.Muscles
const {SummaryData, SummaryAcces} = require('../util/dutil.js');
//Get user information based on the presence of the user token in the header 
async function GetUser(req,res,next){
    const user = res.locals.user;

    try{
        const foundUser = await User.findOne({_id:user},"email username");
        console.log(`User: ${user} : ${foundUser}`);
       return res.send({user:foundUser})
    }
    catch(e){
       return next({code:404 ,message:e.message});
    }
}

/**  Request controler for generating a summary */
async function GetWholeSummary(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user; // get our query data
    if(start > end){
        return next({code:416,message:'Dates not in correct order for summary'})
    }
    const endDate = end !=0 ? new Date(end) : Date.now(); //if end date is default value of 0 just make it current time and find all workouts up to this point
    //Our final result object
    const summaryData = await GenerateSummary(user,start,endDate);
    if(summaryData instanceof Error){
        if(summaryData.name === "CastError"){
            return next({code:400,message:summaryData.message})
        }
        return next({code:500,message:summaryData.message})
    }
    else if(summaryData && summaryData.total_workouts > 0){
        return res.send({summary:summaryData, muscle_list: Object.keys(MuscleInformation)})
    }
    return next({code:204,message:'No data found'}) // no data / nothing found
}


/**  Function Summary Generation (not request dependent) should be able to generate summaries elsewhere now*/
async function GenerateSummary(user,start,end){
    var data = new SummaryData();
    try{
        const workouts = await Workout.find({user_id:user,createdAt:{$gte: new Date(start), $lte: new Date(end)}}).populate({path:"exercises", populate: {path: "motion.motion motion.motion.muscles motion.umotion motion.umotion.muscles sets"}});
        
        console.log(`Generating Summary between ${new Date(start).toString()}-${new Date(end).toString()}: found ${workouts.length} workouts`)
        if(workouts.length > 0){
            workouts.forEach( (workout) => {
                data.total_workouts+=1; //increment workout count
                GetSingleWorkoutSummary(workout, data); // defer to function
            })
        }

        // Calculate Z-scores for muscles
        data.muscle_z = GenerateZScores(data);
        console.log(data.muscle_z)
        return data;
    }
    catch(e){
        console.log(e)
        return e;
    }
}

function GenerateZScores(data){
    console.log('Generating z-scores')
    // go over each type in the muscles array contained in data
        // sum up the values contained in each object
        // calculate the average, and stdeviation
        // calculate z-score for muscle in type
        // place in the muscles_z[type] object
    if(!data.muscles){
        throw new Error('No Muscles to build from')
    }
    const muscle_z = [];
    data.muscles.forEach((muscle_object,index)=>{
        // Muscle object contains a object s.t { muscle: impact_value}
        // Sum all these values to generate a average for this type
        // calculate

        const sum = Object.keys(muscle_object).reduce((acum,key)=>{
            return acum + muscle_object[key];
        },0);
        

        //average value
        const average = sum / Object.keys(muscle_object).length;

        // stdev
        const sigma = Math.sqrt(( Object.keys(muscle_object).reduce((acum,key)=>{
            
            const diff = Math.pow(average-muscle_object[key],2);
            return acum + diff;
        },0) / Object.keys(muscle_object).length ));

        console.log(`sum: ${sum}, avg: ${average}, sigma: ${sigma}`)
        const z_score = {}
        Object.keys(muscle_object).forEach((muscle,index)=>{
            z_score[muscle] = (muscle_object[muscle]-average) / sigma;
        })

        muscle_z[index] = z_score;

    })

    return muscle_z;
    
}

// Do what we can on the individual workout level
function GetSingleWorkoutSummary(workout, summaryData){
   if(workout.exercises){
        workout.exercises.forEach( (exercise) => {
            summaryData.total_exercises+=1; // increment exercise count and defer
            GetExerciseSummary(exercise,summaryData);
        }
        )
    }
}

//this is really bad imo
// The sausage gets made here
function GetExerciseSummary(exercise, summaryData){
    
    const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion;//determine motion type for access

    //calculate sum of products between each set and its value*weight
    var sum = exercise.sets.reduce( (total,set) => { 
        var weight = set.added_weight > 0 ? set.added_weight : 1; // ensure non 0
        return total + (set.rep_or_time*weight);
    },0)
    
   
    //calculate muscle impact
    const impacts = {}
    
    const keys = Array.from(motion.muscles.keys());
    keys.forEach( (key) => { 
        const percent = motion.muscles.get(key)
        const impact = Math.round(percent*sum*100)/100;
        impacts[key] = impact;
        const stored = summaryData.muscles[motion.type][key] ?? 0;
        summaryData.muscles[motion.type][key] = impact + stored
    }) // rounding to avoid wack extra decimals
    
    console.log(impacts)
    summaryData.exercise_totals[motion.type] += sum; // add our total 
    //For storing values as we average and access later
    const minValue = 1000000;
    var value = {min:[minValue,0],max:[0,0],avg:0}
    var weight = {min:[0,minValue],max:[0,0],avg:0}

    //get min max and average
    exercise.sets.forEach( (set) => {
        value.min[0] = value.min[0] < set.rep_or_time ? value.min[0] : set.rep_or_time // rep minimum
        value.min[1] = value.min[0] < set.rep_or_time ? value.min[1] : set.added_weight // relative weight for rep min

        value.max[0] = value.max[0] > set.rep_or_time ? value.max[0] : set.rep_or_time // rep max
        value.max[1] = value.max[0] > set.rep_or_time ? value.max[1] : set.added_weight// assoc weight for rep max
        value.avg += set.rep_or_time

        weight.min[1] = weight.min[1] < set.added_weight ? weight.min[1] : set.added_weight //Weight min
        weight.min[0] = weight.min[1] < set.added_weight ? weight.min[0] : set.rep_or_time // assoc reps for weight min

        weight.max[1] = weight.max[1] > set.added_weight ? weight.max[1] : set.added_weight // weight max
        weight.max[0] = weight.max[1] > set.added_weight ? weight.max[0] : set.rep_or_time // assoc reps for max
        weight.avg += set.added_weight
    });

    value.min[0] = value.min[0]!== minValue ? value.min[0] : 0; // ensure we don't return the min value
    weight.min[1] = weight.min[1]!== minValue ? weight.min[1] : 0;

    //calculate average on this exercise
    value.avg = value.avg / (exercise.sets.length > 0? exercise.sets.length : 1);
    weight.avg = weight.avg / (exercise.sets.length > 0? exercise.sets.length : 1);
    const m = exercise.sets.length;
    summaryData.total_sets+=m;
    
    // we have data for this motion already so update it
    if(summaryData.exercise_summary[motion.name]){
        
        const cur_sum = summaryData.exercise_summary[motion.name]; // get the current data
        const cur_keys = Array.from(cur_sum.muscles.keys());
        summaryData.exercise_summary[motion.name] = { // update
            n: cur_sum.n+m, //increment sets
            type: cur_sum.type, // this should be the same
            values: {
                min: (cur_sum.values.min[0] > value.min[0] ? value.min : cur_sum.values.min), // checking if our mins/maxs
                max: (value.max[0] > cur_sum.values.max[0] ? value.max : cur_sum.values.max), // update avg
                avg: ((cur_sum.values.avg*cur_sum.n) +(value.avg*m))/(m+cur_sum.n)
            },
            weights: {
                min: (weight.min[1] < cur_sum.weights.min[1] ? weight.min : cur_sum.weights.min),
                max: (weight.max[1] > cur_sum.weights.max[1] ? weight.max : cur_sum.weights.max),
                avg: ((cur_sum.weights.avg*cur_sum.n) +(weight.avg*m))/(m+cur_sum.n)
            },
            muscles: cur_keys.map((key,index) => {return cur_sum.muscles.get(key)+impacts[key]}) // update overall muscle impact from workout
        }
    }
    else{ // no data for this motion stored so set it
        summaryData.exercise_summary[motion.name] = {
            n:exercise.sets.length,
            type:motion.type,
            values:value,
            weights:weight,
            muscles: impacts
        }
    }
    
}




async function ChangeUsername(req,res,next){
    const {username} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        const updatedUser = await User.findOneAndUpdate({_id:user},{$set: {username:username}});
        console.log(updatedUser);
        res.send({user:updatedUser});
    }
    catch(e){
        console.log(e)
        next({code:404,message:e.message});
    }
}

module.exports = {GetWholeSummary:GetWholeSummary,GetUser:GetUser,ChangeUsername:ChangeUsername,GetSingleWorkoutSummary:GetSingleWorkoutSummary,GenerateSummary:GenerateSummary}