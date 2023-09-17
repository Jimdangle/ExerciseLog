//External
const express = require('express');
const mongoose = require('mongoose');

//Internal
//const Exercise = require('../models/mExercise'); // exercise schema
const {Workout, Exercise, Motion} = require('../models/mWorkout'); // workout schema
const Config = require('../config/cfLogin');

const sutil = require('../util/sutil.js');

//create workout
async function CreateWorkout(req, res, next) {
    var user = res.locals.user;
    //const userfromDB = await User.findOne({username:}); // search for our user
    
    try {
        var newWorkout = new Workout({user_id: user});
        const added = await newWorkout.save(); 
        console.log(added);
        res.send({created:true, id:newWorkout._id});
    }
    catch(e)
    {
        res.send(e.message);
    }  
}

// remove workout 
async function DeleteWorkout(req,res,next){
    const {workout_id} = res.locals.bodyData;
    console.log(workout_id);
    try{
        const delWorkout = await Workout.deleteOne({_id:workout_id});
        res.send({deleted:true, count:delWorkout});
    }
    catch(e){
        res.send({message:e.message});
    }
}

//List workouts
async function ListWorkouts(req,res,next){
    try{
        const found = await Workout.find({});
        res.send({all: found});
    }
    catch(e){
        res.send({message:e.message});
    }
}

// add execise to a workout
// request should send the id of the workout we are adding the exercise too, as well as the id of the motion they intend to add
async function AddExercise(req,res,next){
    const {workout_id,motion_id} = res.locals.bodyData;
    try{
        const addedExercise = new Exercise({motion:motion_id});
        const newEx = await addedExercise.save();
        console.log(newEx);
        try{
            const assocWorkout = await Workout.findOneAndUpdate({_id:workout_id},{$push: {"exercises" : newEx._id}});
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


// remove exercise 

// maybe a finish exercise function which would flag the workout as completed so that new exercises arent added //

module.exports = {CreateWorkout: CreateWorkout,  DeleteWorkout:DeleteWorkout, ListWorkouts:ListWorkouts, AddExercise:AddExercise}