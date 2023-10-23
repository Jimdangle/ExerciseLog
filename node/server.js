// server.js
// This file should mount univeral middleware
// and handle generic error response / logging
const express = require('express'); 
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const bcrypt = require('bcrypt');

//Create an app
const app = express();

const Login = require('./src/routes/rLogin').LoginRouter; // Login Routing
const WorkoutR = require('./src/routes/rWorkout').WorkoutRouter; 
const Admin = require('./src/routes/rAdmin').AdminRouter;
const User = require('./src/routes/rUser').UserRouter;
const MotionR = require('./src/routes/rMotion').MotionRouter;
const GoalsR = require('./src/routes/rGoals').GoalRouter;

const corsOpts = require('./src/config/cfCors').corsOpts;
const dutil = require('./src/util/dutil');

const {Motion,UserMotion,Workout,Exercise,Set} = require('./src/models/mWorkout');
const mUser = require('./src/models/mUsers');
app.use(cors(corsOpts));

// First Entry Point
app.use('/', (req,res,next) => {
    var query = (req.query) ? req.query : {};
    console.log(`${req.method} on ${req.path}`);
    next();
})


//Router Mounting
app.use('/login/', Login);
app.use('/workout/', WorkoutR);
app.use('/admin/', Admin);
app.use('/user/', User);
app.use('/motion/', MotionR);
app.use('/goals/',GoalsR);



app.use((err,req,res,next) => 
    handleError(err,req,res,next)
); // Error handling



//Listen port
const PORT = process.env.SERVER_PORT || 3001;
const server = app.listen(PORT);
console.log(`Running on port ${PORT}`);
load_mongo();

server.on('close', ()=>{
    mongoose.connection.close()
})

const reset_db=true;

async function load_mongo(){
    try {
        await mongoose.connect(process.env.MONGO_URL); //initialize databse here
    }
    catch(e){
        console.log(e.message);
    }
}



function handleError(err, req, res, next) {
    console.log(`Error on path: ${req.path} using ${req.method}`)
    console.log(err.code);
    console.log(err.message);
    res.status(err.code).send();
}

module.exports = {app,server}