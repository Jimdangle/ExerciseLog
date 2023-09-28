//rMotion.js 
//route for User Motion based actions
// handle using correct middleware, and calling proper controllers 
// Ensure that correct keys are used on each entry
const express = require('express');
const bodyParser = require('body-parser');


const sutil = require('../util/sutil.js');
const MotionControllers = require('../controllers/cMotion.js');


const MotionRouter = express.Router(); // create our router object

const REQUIRED_KEYS = {
    "/ls" : true,
    "/lsm": true,
    "/lsa": true,
    "/add": ["name", "muscles", "type"],
    "/rem": ["umotion"]
}


MotionRouter.use(bodyParser.json());

// Verify our JWT fist on this router
MotionRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body
    sutil.ValidateToken(req,res,next);
})

// Check keys
MotionRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
});


// List motions out
MotionRouter.get('/ls', MotionControllers.ListMotions);
MotionRouter.get('/lsm', MotionControllers.ListUserMotions);
MotionRouter.get('/lsa', MotionControllers.ListAllMotions);

//Add a new user motion
MotionRouter.post('/add', MotionControllers.AddUserMotion);

//Remove a user motion
MotionRouter.delete('/rem', MotionControllers.RemoveUserMotion);


module.exports = {MotionRouter: MotionRouter}