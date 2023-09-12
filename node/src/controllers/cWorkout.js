//External
const express = require('express');
const mongoose = require('mongoose');

//Internal
//const Exercise = require('../models/mExercise'); // exercise schema
const Workout = require('../models/mWorkout'); // workout schema
const Config = require('../config/cfLogin');

//create workout
async function CreateWorkout(req, res, next) {
    var username = req.body.user;
   
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

// add execise 

// remove workout 

// remove exercise 

module.exports = {CreateWorkout: CreateWorkout, }