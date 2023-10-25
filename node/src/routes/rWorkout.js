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
    "/add": true,
    "/delete": ["workout_id"],
    "/addEx": ["motion_id", "workout_id"],
    "/remEx": ["exercise_id", "workout_id"],
    "/addSet": ["rep_or_time", "weight", "exercise_id"],
    "/remSet": ["set_id", "exercise_id"],
    "/get": ["workout_id"],
    "/editName": ["workout_id", "name"],
    "/getEx": ["exercise_id"]
}

WorkoutRouter.use(bodyParser.json());


// Verify our JWT fist on this router
WorkoutRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body
    sutil.ValidateToken(req,res,next);
})

// Check keys
WorkoutRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
    
});



// Create a new workout
WorkoutRouter.post('/add', async (req, res, next) => {
    WorkoutControllers.CreateWorkout(req, res, next); 
})


// Delete a workout
WorkoutRouter.delete('/delete', async(req,res,next) =>{
    WorkoutControllers.DeleteWorkout(req,res,next);
})

// Get a specified workout
WorkoutRouter.post('/get', WorkoutControllers.GetWorkout);

// remove Exercise from workout 
WorkoutRouter.delete('/remEx', async(req, res, next) => {
    WorkoutControllers.RemoveExercise(req, res, next);
})


// add exercise to workout
WorkoutRouter.post('/addEx', async(req,res,next) => {
    WorkoutControllers.AddExercise(req,res,next);
})

//Get a single exercises data
WorkoutRouter.post('/getEx', WorkoutControllers.GetExercise);


//add set to Exercise 
WorkoutRouter.post('/addSet', async(req, res, next) => {
    WorkoutControllers.AddSet(req, res, next);
})

// remove set from exercise 
WorkoutRouter.delete('/remSet', async(req, res, next) => {
    WorkoutControllers.RemoveSet(req, res, next);
})

WorkoutRouter.post('/editName', WorkoutControllers.EditWorkoutName);


WorkoutRouter.get('/lsm', WorkoutControllers.ListMyWorkouts);

module.exports = {WorkoutRouter: WorkoutRouter}