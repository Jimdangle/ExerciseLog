// Routes to be used for development / admin reasons
const express = require('express');
const bodyParser = require('body-parser');

const GoalContoller = require('../controllers/cGoals')
const sutil = require('../util/sutil.js');


const GoalRouter = express.Router();
GoalRouter.use(bodyParser.json());


const REQUIRED_KEYS = {
    "/new": ["start","end"],
    "/addObj": ["context","target","value","goal_id"],
    "/remObj": ["objective_id"],
    "/rem": ["goal_id"],
    "/ls": true,
    "/lsr": ["start","end"]
}


// Verify our JWT fist on this router
GoalRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body
    sutil.ValidateToken(req,res,next);
})

// Check keys
GoalRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
});

GoalRouter.post('/new', GoalContoller.CreateNewGoal );
GoalRouter.delete('/rem',GoalContoller.RemoveGoal);
GoalRouter.get('/ls', GoalContoller.ListGoals);
GoalRouter.post('/addObj', GoalContoller.AddObj);
module.exports = {GoalRouter:GoalRouter}