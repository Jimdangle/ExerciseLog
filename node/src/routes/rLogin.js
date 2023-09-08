//rLogin.js 
// Route for login based actions
// handle using correct middleware, and calling proper controllers 
// Ensure that correct keys are used on each entry
const express = require('express');
const bodyParser = require('body-parser');

const sutil = require('../util/sutil.js');
const LoginControllers = require('../controllers/cLogin');

const LoginRouter = express.Router(); // create our router object

const REQUIRED_KEYS = {
    "/signup": ["email", "pass"],
    "/u": true
}


LoginRouter.use(bodyParser.json());

LoginRouter.use('', (req,res,next) => {
    const body = JSON.stringify(req.body);
    console.log(body);
    res.locals.bodyData = req.body;
    if(sutil.ValidateKeys(req.body, REQUIRED_KEYS[req.path]) || REQUIRED_KEYS[req.path] === true){
        next();
    }
    else{
        res.status(401).send({"error":"Missing Required Keys"});
    }
})

LoginRouter.post('/signup', async (req,res,next) => {
    LoginControllers.HandleSignup(req,res,next); // pass to controller
})


LoginRouter.get('/u', async (req,res,next) => {
    LoginControllers.GetAllUsers(req,res,next)
    
})




module.exports = {LoginRouter: LoginRouter};