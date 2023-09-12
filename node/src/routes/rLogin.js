//rLogin.js 
// Route for login based actions
// handle using correct middleware, and calling proper controllers 
// Ensure that correct keys are used on each entry
const express = require('express');
const bodyParser = require('body-parser');

const sutil = require('../util/sutil.js');
const LoginControllers = require('../controllers/cLogin');

const LoginRouter = express.Router(); // create our router object

// A Map for each route and its required keys, used in concjunction with sutils.ValidateKeys
const REQUIRED_KEYS = {
    "/signup": ["email", "pass"],
    "/u": true,
    "/login": ["email", "pass"]
}

// Attach body parsing middleware
LoginRouter.use(bodyParser.json());

//I decided to handle keys on the root of this router
LoginRouter.use('', (req,res,next) => {
    res.locals.bodyData = req.body; // store our data (honestly dont think i need this)
    //if we are able to validate the keys, or if the required keys is just == true call the next function
    sutil.Verify(req.body, REQUIRED_KEYS[req.path], next);
})

//Create a new user account
LoginRouter.post('/signup', async (req,res,next) => {
    LoginControllers.HandleSignup(req,res,next); // pass to controller
})

//Login with an existing user account
LoginRouter.post('/login', async(req,res,next) => {
    LoginControllers.HandleLogin(req,res,next);
})

//View existing user accounts
LoginRouter.get('/u', async (req,res,next) => {
    LoginControllers.GetAllUsers(req,res,next)
    
})





module.exports = {LoginRouter: LoginRouter};