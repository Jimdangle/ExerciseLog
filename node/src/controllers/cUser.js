const User = require('../models/mUsers.js')
const {Workout} = require('../models/mWorkout.js');

const {SummaryData} = require('../util/dutil.js');
//Get user information based on the presence of the user token in the header 
async function GetUser(req,res,next){
    const user = res.locals.user;

    try{
        const foundUser = await User.findOne({_id:user},"email username");
        console.log(`User: ${user} : ${foundUser}`);
        res.send({user:foundUser})
    }
    catch(e){
        next(e.message);
    }
}


async function GetWholeSummary(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user; // get our query data
    
    const endDate = end !=0 ? new Date(end) : Date.now();
    //Our final result object
    var data = new SummaryData();
    try{
        const workouts = await Workout.find({user_id:user,createdAt:{$gte: new Date(start), $lte: endDate}}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        console.log(workouts)
        console.log(`Generating Summary between ${new Date(start).toString()}-${new Date(endDate).toString()}: found ${workouts.length} workouts`)
        if(workouts.length > 0){
            workouts.forEach( (workout) => {
                data.total_workouts+=1; //increment workout count
                GetSingleWorkoutSummary(workout, data); // defer to function
            })
        }

        res.send({summary:data})
    }
    catch(e){
        next(e.message)
    }
}

// Do what we can on the individual workout level
function GetSingleWorkoutSummary(workout, summaryData){
   
    workout.exercises.forEach( (exercise) => {
        summaryData.total_exercises+=1; // increment exercise count and defer
        GetExerciseSummary(exercise,summaryData);
    }
    )
}

// The sausage gets made here
function GetExerciseSummary(exercise, summaryData){
    
    const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion;//determine motion type for access

    //calculate sum of products between each set and its value*weight
    var sum = exercise.sets.reduce( (total,set) => { 
        var weight = set.added_weight > 0 ? set.added_weight : 1; // ensure non 0
        return total + (set.rep_or_time*weight);
    },0)
    
    //calculate muscle impact
    var impact = motion.muscles.map( (val) => { return Math.round(val*sum)}) // rounding to avoid wack extra decimals
    summaryData.muscles[motion.type] = summaryData.muscles[motion.type].map( (item,index) => {return item+impact[index]}) // add in our impact
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

        weight.max[1] = weight.min[1] > set.added_weight ? weight.max[1] : set.added_weight // weight max
        weight.max[0] = weight.min[1] > set.added_weight ? weight.max[0] : set.rep_or_time // assoc reps for max
        weight.avg += set.added_weight
    });

    value.min[0] = value.min[0]!== minValue ? value.min[0] : 0; // ensure we don't return the min value
    weight.min[1] = weight.min[1]!== minValue ? weight.min[1] : 0;

    //calculate average on this exercise
    value.avg = value.avg / (exercise.sets.length > 0? exercise.sets.length : 1);
    weight.avg = weight.avg / (exercise.sets.length > 0? exercise.sets.length : 1);
    const m = exercise.sets.length;
    summaryData.total_sets+=m;
    

    if(summaryData.exercise_summary[motion.name]){
        // we have data for this motion already so update it
        const cur_sum = summaryData.exercise_summary[motion.name];
        summaryData.exercise_summary[motion.name] = {
            n: cur_sum.n+m,
            type: cur_sum.type,
            values: {
                min: (cur_sum.values.min[0] > value.min[0] ? value.min : cur_sum.values.min),
                max: (value.max[0] > cur_sum.values.max[0] ? value.max : cur_sum.values.max),
                avg: ((cur_sum.values.avg*cur_sum.n) +(value.avg*m))/(m+cur_sum.n)
            },
            weights: {
                min: (weight.min[1] < cur_sum.weights.min[1] ? weight.min : cur_sum.weights.min),
                max: (weight.max[1] < cur_sum.weights.max[1] ? weight.max : cur_sum.weights.max),
                avg: ((cur_sum.weights.avg*cur_sum.n) +(weight.avg*m))/(m+cur_sum.n)
            },
            muscles: cur_sum.muscles.map ((item,index) => {return item+impact[index]})
        }
    }
    else{ // no data for this motion stored so set it
        summaryData.exercise_summary[motion.name] = {
            n:exercise.sets.length,
            type:motion.type,
            values:value,
            weights:weight,
            muscles: impact
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
        next(e.message);
    }
}

module.exports = {GetWholeSummary:GetWholeSummary,GetUser:GetUser,ChangeUsername:ChangeUsername,GetSingleWorkoutSummary:GetSingleWorkoutSummary}