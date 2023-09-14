//rWorkout.js 
//route for workout based actions
// handle using correct middleware, and calling proper controllers 
// Ensure that correct keys are used on each entry
const express = require('express');
const bodyParser = require('body-parser');


const sutil = require('../util/sutil.js');
const WorkoutControllers = require('../controllers/cWorkout.js')

const WorkoutRouter = express.Router(); // create our router object

const REQUIRED_KEYS = {
    "/workout": true, 
}

WorkoutRouter.use(bodyParser.json());

WorkoutRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
    
});

// Create a new workout
WorkoutRouter.post('/workout', sutil.ValidateToken, async (req, res, next) => {
    WorkoutControllers.CreateWorkout(req, res, next); 
})

// Create a new exercise
WorkoutRouter.post('/exercise', sutil.ValidateToken ,async (req, res, next) => {
    WorkoutControllers.CreateExercise(req, res, next); 
})

module.exports = {WorkoutRouter: WorkoutRouter}