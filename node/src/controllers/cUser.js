const User = require('../models/mUsers.js')
const {Workout} = require('../models/mWorkout.js');
const { GetDate } = require('../util/dateutil.js');
const {ExerciseVolume} = require('../util/summaryutil.js');
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


async function GetWorkoutSummary(req,res,next){
    const user = res.locals.user;
    try{
        const usersWorkouts = await Workout.find({user_id:user}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        var userSummary = {count:0,motion_count:0,motions:{}}
        usersWorkouts.forEach( (workout) => {
            console.log(workout);
            userSummary.count+=1;
            workout.exercises.forEach( (exercise) => {
                userSummary.motion_count+=1;
                var properName = exercise.motion.motion ? exercise.motion.motion.name : exercise.motion.umotion.name
                if(userSummary.motions[properName]){userSummary.motions[properName]+=1}
                else{userSummary.motions[properName]=1}
            })
        })
        console.log(userSummary);
        res.send({summary:userSummary})
        

    }
    catch(e){
        next(e.message);
    }
}

// This will return a pretty complex object of all the users stats over a given window
// stats: {
//          total_workouts: number
//          total_exercises: number
//          total_volume: number
//          heaviest weight: {motion_name:string, weight:number} name and weight of heaviest lift
//          highest_reps:  {motion_name:string, reps:number} name and number of reps of most repped lift
//          motion_data: {motion1:number,motion2:number, etc...} dictionary with a count of all motions
async function GetComplexSummary(req,res,next){
    const {range} = res.locals.bodyData; //date range 0:week, 1:month, 2:4-months, 3:year, 4:all time
    
    const user = res.locals.user;

    var stats = {total_workouts:0,total_exercises:0,total_volume:0,heaviest_weight:{name:"",weight:0},highest_reps:{name:"",reps:0},motion_data:{},muscle_group_volume:[]}
    const compareDate = GetDate(range); // Date to compare against 
    try{
        //Find all meeting date range and populate
        const workouts = await Workout.find({user_id:user, createdAt: {$gte: compareDate}}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        //deep accumulation lmao basically,  sum the volume in each exercise, over all exercises, over all workouts
        const total_volume = workouts.reduce( (accum, workout) => {return (workout.exercises) ? (accum + workout.exercises.reduce( (accum2,ex) => {return accum2+ ExerciseVolume(ex)},0 )) : 0},0);
        const total_exercises = workouts.reduce( (a,w) => { return (w.exercises? a + w.exercises.length : 0)},0); // sum number of exercises over all workouts

        console.log(`SUMMARY FOR RANGE:\n\tRange: ${range}\n\t Date:${compareDate.toString()}\n\tresults : ${workouts.length}\n`);
        
        var found_motions = {} // A dictionary of all the motions a user has done, as well as the max
        workouts.forEach( (workout) => { // loop over all the workouts 
            if(workout.exercises){ // if we have an exercise 
                workout.exercises.forEach( (exercise) => { // loop over all them
                    const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion; //determine our motion type
                    
                    // calculate a max for the reps and weight in a given exercise
                    const repMax = exercise.sets ?  Math.max(...exercise.sets.map((set)=>{return set.rep_or_time})) : 0;
                    const weightMax = exercise.sets ? Math.max(...exercise.sets.map((set)=>{return set.added_weight})) : 0;

                    if(stats.heaviest_weight.weight < weightMax){stats.heaviest_weight = {name:motion.name,weight:weightMax}}
                    if(stats.highest_reps.reps < weightMax){stats.highest_reps = {name:motion.name,reps:repMax}}

                    // compare to a motion if we have already seen it
                    if(found_motions[motion._id]){
                        found_motions[motion._id].count +=1; // increase the count
                        found_motions[motion._id].reps = (found_motions[motion._id].reps > repMax) ? found_motions[motion._id].reps : repMax;
                        found_motions[motion._id].weight = (found_motions[motion._id].weight > weightMax) ? found_motions[motion._id].weight : weightMax;;
                    }
                    else{
                        found_motions[motion._id] = {name: motion.name,reps: repMax, weight: weightMax, count:1}
                    }
                })
            }
        })
        
        
        

        
        stats.total_workouts = workouts.length;
        stats.total_exercises = total_exercises;
        stats.total_volume = total_volume;
        stats.motion_data = found_motions;
        
        res.send({stats:stats})
    }
    catch(e)
    {
        next(e.message);
    }
}


async function GetWholeSummary(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user; // get our query data
    
    const endDate = end !=0 ? new Date(end) : Date.now();
    //Our final result object
    var summaryData = {total_workouts:0,total_exercises:0,total_sets:0,exercise_totals:[0,0,0],muscles:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],exercise_summary:{}}
    try{
        const workouts = await Workout.find({user_id:user,createdAt:{$gte: new Date(start), $lte: endDate}}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        console.log(`Generating Summary between ${new Date(start).toString()}-${new Date(endDate).toString()}: found ${workouts.length} workouts`)
        if(workouts.length > 0){
            workouts.forEach( (workout) => {
                summaryData.total_workouts+=1; //increment workout count
                GetSingleWorkoutSummary(workout, summaryData); // defer to function
            })
        }

        res.send({summary:summaryData})
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
    var value = {min:minValue,max:0,avg:0}
    var weight = {min:minValue,max:0,avg:0}

    //get min max and average
    exercise.sets.forEach( (set) => {
        value.min = value.min < set.rep_or_time ? value.min : set.rep_or_time
        value.max = value.max > set.rep_or_time ? value.max : set.rep_or_time
        value.avg += set.rep_or_time

        weight.min = weight.min < set.added_weight ? weight.min : set.added_weight
        weight.max = weight.min > set.added_weight ? weight.max : set.added_weight
        weight.avg += set.added_weight
    });

    value.min = value.min!== minValue ? value.min : 0;
    weight.min = weight.min!== minValue ? weight.min : 0;

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
                min: Math.min(cur_sum.values.min, value.min),
                max: Math.max(value.max,cur_sum.values.max),
                avg: ((cur_sum.values.avg*cur_sum.n) +(value.avg*m))/(m+cur_sum.n)
            },
            weights: {
                min: Math.min(weight.min,cur_sum.weights.min),
                max: Math.max(weight.min,cur_sum.weights.min),
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

module.exports = {GetWholeSummary:GetWholeSummary,GetUser:GetUser, GetWorkoutSummary:GetWorkoutSummary,GetComplexSummary:GetComplexSummary,ChangeUsername:ChangeUsername}