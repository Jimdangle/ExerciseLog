// Routes to be used for development / admin reasons
const express = require('express');
const bodyParser = require('body-parser');

const GoalRouter = express.Router();

GoalRouter.use(bodyParser.json());

// Verify our JWT fist on this router
GoalRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body
    sutil.ValidateToken(req,res,next);
})

// Check keys
GoalRouter.use('', (req, res, next) => {
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
});