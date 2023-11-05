
//Internal
//const Exercise = require('../models/mExercise'); // exercise schema
const {Workout, Exercise, Motion, Set} = require('../models/mWorkout'); // workout schema


/**
 * Create a new workout attached to a authenticated users token
 */
async function CreateWorkout(req, res, next) {
    var user = res.locals.user;
    //const userfromDB = await User.findOne({username:}); // search for our user
    const {name,backdate} = res.locals.bodyData;
    
    try {
        var newWorkout = new Workout({user_id: user});
        if(name){
            newWorkout.name = name;
        }
        const added = await newWorkout.save(); 
        console.log(added);
        return res.send({created:true, workout_id:newWorkout._id});
    }
    catch(e)
    {
        return next({message:e.message,code:500});
    }  
}

/**
 * Delete a workout based on the workout objects id
 */
async function DeleteWorkout(req,res,next){
    const {workout_id} = res.locals.bodyData;
    //console.log(workout_id);
    try{
        const delWorkout = await Workout.deleteOne({_id:workout_id, user_id:res.locals.user});
        if(delWorkout.deletedCount===1){
           return  res.send({deleted:true, workout_id:workout_id});
        }
        else{
            return res.send({deleted:false, workout_id:workout_id})
        }
    }
    catch(e){
        
        return next({message:e.message,code:500});
    }
}


/** 
 * List all workouts for a particular user (this will replace ListWorkouts at somepoint)
 */
async function ListMyWorkouts(req,res,next){
    try{
        const found = await  Workout.find({user_id:res.locals.user})//.populate({path: "exercises", populate: {path: "motion sets"}});
        console.log(found);
        return res.send({all:found});
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

/**
 * 
 */
async function GetWorkout(req,res,next){
    const {workout_id} = res.locals.bodyData;
    try{
        console.log(res.locals.user);
        const found = await Workout.findOne({_id:workout_id, user_id:res.locals.user}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        if(!found){return next({code:404,message:'No Workout found'})}
        return res.send({workout:found, workout_id:workout_id});
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

/**
 * Attach a Exercise to a Workout by passing a workout_id and motion_id in the request
 * 
 */
async function AddExercise(req,res,next){
    const {workout_id,motion_id} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        const motion = await Motion.findOne({_id:motion_id})
        const addedExercise = (motion) ? new Exercise({motion: {motion: motion_id},user_id:user}) : new Exercise({motion: {umotion: motion_id}}) ;
        const newEx = await addedExercise.save();
        
        
        await Workout.findOneAndUpdate({_id:workout_id,user_id:res.locals.user},{$push: {"exercises" : newEx._id}});
        return res.send({added:true, exercise_id:newEx._id});
        
    }
    catch(e){
        console.log('Error creating exercise ')
        return next({message:e.message,code:500});
    }
    
    
}


// remove exercise from specific workout
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function RemoveExercise(req, res, next) {
    const {workout_id, exercise_id} = res.locals.bodyData;
    //console.log(workout_id);
    //console.log(exercise_id);

    try {
        const assocWorkout = await Workout.findOneAndUpdate({_id:workout_id},{$pull: {"exercises" : exercise_id}});
        const del = await Exercise.deleteOne({_id: exercise_id});
        if(del.deletedCount===1){
            return  res.send({deleted:true, exercise_id:exercise_id, workout_id:assocWorkout._id});
        }
        else if(del.deletedCount < 1){
            return res.send({deleted:false, exercise_id:exercise_id, workout_id:workout_id})
        }
       
    }
    catch (e) {
        console.log('Error removing exercise from workout')
        console.log(e.name)
        return next({message:e.message,code:500});
    }

}


async function GetExercise(req,res,next){
    const {exercise_id} = res.locals.bodyData;
    const user = res.locals.user;

    try{
        const found = await Exercise.findOne({_id:exercise_id}).populate({path: 'sets motion.motion motion.umotion'})
        if(!found){
            return next({code:404})
        }
        res.send({exercise:found, exercise_id:exercise_id})
    }
    catch(e){
        next({code:500,message:e.message})
    }
}

// add set to an exercise 
async function AddSet(req, res, next) {
    const {rep_or_time, weight, exercise_id} = res.locals.bodyData;
    //console.log(exercise_id);
    //console.log(weight);
    //console.log(rep_or_time);

    try {
        const addedSet = new Set({rep_or_time: rep_or_time, added_weight: weight});
        const newSet = await addedSet.save();
        
        const assocExercise = await Exercise.findOneAndUpdate({_id:exercise_id},{$push: {"sets" : newSet._id}});
        if(!assocExercise){
            return next({code:404,message:'No exercise to add to'})
        }
        return res.send({added:true, set_id:newSet._id});
        
    }
    catch(e){
        if(e.code==="ERR_ASSERTION"){
            return next({code:400,message:'Bad values for reps/weights'})
        }
        if(e.name==="ValidationError"){
            return next({code:422,message:'Unable to validate data but right types'})
        }
        if(e.name==="CastError"){
            return next({code:400,message:'Bad format for data'})
        }
        console.log(e);
        return next({message:e.message,code:500});
    }
}
    
async function RemoveSet(req, res, next) {
    const {set_id, exercise_id} = res.locals.bodyData;
    //console.log(set_id);
    //console.log(exercise_id);

    try {
        const assocExercise = await Exercise.findOneAndUpdate({_id:exercise_id},{$pull: {"sets" : set_id}});
        const del = await Set.deleteOne({_id: set_id});
        console.log(assocExercise)
        console.log(del)
        if(!assocExercise){
            return next({code:404,message:'No associated exercise'})
        }
        if(del.deletedCount===1){
            return res.send({deleted:true, set_id:set_id});
        }
        if(del.deletedCount===0){
            return next({code:404,message: 'No Associated set found'})
        }
        
    }
    catch (e) {
        console.log('Error removing set from exercise')
        console.log(e.name);
        if(e.code==="ERR_ASSERTION"){
            return next({code:400,message:'Bad values for reps/weights'})
        }
        if(e.name==="ValidationError"){
            return next({code:422,message:'Unable to validate data but right types'})
        }
        if(e.name==="CastError"){
            return next({code:400,message:'Bad format for data'})
        }
        next({message:e.message,code:500});
    }

}

async function EditWorkoutName(req, res, next) {
    const {workout_id, name} = res.locals.bodyData;

    try {
        const assocWorkout = await Workout.findOneAndUpdate({_id:workout_id},{$set: {name:name}});
        res.send({updated: true, workout_id:assocWorkout._id, workout_name: assocWorkout.name});
    }
    catch (e) {
        console.log('Error editing name for workout')
        console.log(e);
        next({message:e.message,code:500});
    }
}

// maybe a finish exercise function which would flag the workout as completed so that new exercises arent added //


module.exports = {GetExercise,EditWorkoutName:EditWorkoutName, GetWorkout:GetWorkout, ListMyWorkouts:ListMyWorkouts, CreateWorkout: CreateWorkout,  DeleteWorkout:DeleteWorkout, AddExercise:AddExercise, RemoveExercise:RemoveExercise, AddSet:AddSet , RemoveSet: RemoveSet}    