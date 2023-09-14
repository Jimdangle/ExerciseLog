//External
const express = require('express');
const mongoose = require('mongoose');

//Internal
//const Exercise = require('../models/mExercise'); // exercise schema
const Workout = require('../models/mWorkout'); // workout schema
const Config = require('../config/cfLogin');

const sutil = require('../util/sutil.js');

//create workout
async function CreateWorkout(req, res, next) {
    var username = req.body.user;
    //const userfromDB = await User.findOne({username:}); // search for our user
   
    try {
        var newWorkout = new Workout({username: username});
        await newWorkout.save(); 
        res.send("new workout created");
    }
    catch(e)
    {
        res.send(e.message);
    }  
}

// create exercise 
async function CreateExercise(req, res, next) {
    try {

    } 
    catch(e) {
        res.send(e.message);        
    }
}
// add execise 

// remove workout 

// remove exercise 

// maybe a finish exercise function which would flag the workout as completed so that new exercises arent added //

module.exports = {CreateWorkout: CreateWorkout, CreateExercise: CreateExercise}