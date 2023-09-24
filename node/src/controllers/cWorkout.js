//External
const express = require('express');
const mongoose = require('mongoose');

//Internal
//const Exercise = require('../models/mExercise'); // exercise schema
const {Workout, Exercise, Motion, Set} = require('../models/mWorkout'); // workout schema
const Config = require('../config/cfLogin');

const sutil = require('../util/sutil.js');
const { GetDate } = require('../util/dateutil');

/**
 * Create a new workout attached to a authenticated users token
 */
async function CreateWorkout(req, res, next) {
    var user = res.locals.user;
    //const userfromDB = await User.findOne({username:}); // search for our user
    const {name,backdate} = res.locals.bodyData;
    const oldDate = backdate ? GetDate(backdate) : false;
    try {
        var newWorkout = new Workout({user_id: user});
        if(name){
            newWorkout.name = name;
        }
        if(backdate){
            newWorkout.createdAt = oldDate;
        }
        const added = await newWorkout.save(); 
        console.log(added);
        res.send({created:true, id:newWorkout._id});
    }
    catch(e)
    {
        res.send(e.message);
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
        res.send({deleted:true, count:delWorkout});
    }
    catch(e){
        res.send({message:e.message});
    }
}

/**
 * List all Workouts stored in mongo
 */
async function ListWorkouts(req,res,next){
    try{
        const found = await Workout.find({}).populate({path: "exercises user_id", populate: {path: "motion sets"}});
        res.send({all: found});
    }
    catch(e){
        res.send({message:e.message});
    }
}

/** 
 * List all workouts for a particular user (this will replace ListWorkouts at somepoint)
 */
async function ListMyWorkouts(req,res,next){
    try{
        const found = await  Workout.find({user_id:res.locals.user})//.populate({path: "exercises", populate: {path: "motion sets"}});
        console.log(found);
        res.send({all:found});
    }
    catch(e){
        next(e.message);
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
        console.log(found);
        res.send({workout:found});
    }
    catch(e){
        next(e.message);
    }
}

/**
 * Attach a Exercise to a Workout by passing a workout_id and motion_id in the request
 * 
 */
async function AddExercise(req,res,next){
    const {workout_id,motion_id} = res.locals.bodyData;
    try{
        const motion = await Motion.findOne({_id:motion_id})
        const addedExercise = (motion) ? new Exercise({motion: {motion: motion_id}}) : new Exercise({motion: {umotion: motion_id}}) ;
        const newEx = await addedExercise.save();
        console.log(newEx);
        try{
            const assocWorkout = await Workout.findOneAndUpdate({_id:workout_id,user_id:res.locals.user},{$push: {"exercises" : newEx._id}});
            res.send({added:true, exercises:assocWorkout.exercises});
        }
        catch(e){
            console.log('Error fixing to worrkout')
            console.log(e);
            res.send({message:e.message});
        }
    }
    catch(e){
        console.log('Error creating exercise ')
        console.log(e);
        res.send({message:e.message});
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
        await Exercise.deleteOne({_id: exercise_id});
        res.send({deleted:true, exercises:assocWorkout.exercises});
    }
    catch (e) {
        console.log('Error removing exercise from workout')
        console.log(e);
        res.send({message:e.message});
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
        try{
            const assocExercise = await Exercise.findOneAndUpdate({_id:exercise_id},{$push: {"sets" : newSet._id}});
            console.log(assocExercise)
            res.send({added:true, exercises:assocExercise.sets});
        }
        catch(e){
            console.log('Error fixing to exercise')
            console.log(e);
            res.send({message:e.message});
        }
    }
    catch(e){
        console.log('Error creating set ')
        console.log(e);
        res.send({message:e.message});
    }
}
    
async function RemoveSet(req, res, next) {
    const {set_id, exercise_id} = res.locals.bodyData;
    //console.log(set_id);
    //console.log(exercise_id);

    try {
        const assocExercise = await Exercise.findOneAndUpdate({_id:exercise_id},{$pull: {"sets" : set_id}});
        await Set.deleteOne({_id: set_id});
        res.send({deleted:true, sets:assocExercise.sets});
    }
    catch (e) {
        console.log('Error removing set from exercise')
        console.log(e);
        res.send({message:e.message});
    }

}
// maybe a finish exercise function which would flag the workout as completed so that new exercises arent added //


module.exports = {GetWorkout:GetWorkout, ListMyWorkouts:ListMyWorkouts, CreateWorkout: CreateWorkout,  DeleteWorkout:DeleteWorkout, ListWorkouts:ListWorkouts, AddExercise:AddExercise, RemoveExercise:RemoveExercise, AddSet:AddSet , RemoveSet: RemoveSet}    