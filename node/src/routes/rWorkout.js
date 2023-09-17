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
    "/rm": ["name"] 
}

WorkoutRouter.use(bodyParser.json());


// Verify our JWT fist on this router
WorkoutRouter.use('', (req,res,next) => {
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



module.exports = {WorkoutRouter: WorkoutRouter}