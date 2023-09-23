// server.js
// This file should mount univeral middleware
// and handle generic error response / logging
const express = require('express'); 
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();


//Create an app
const app = express();

const Login = require('./src/routes/rLogin').LoginRouter; // Login Routing
const Workout = require('./src/routes/rWorkout').WorkoutRouter; 
const Admin = require('./src/routes/rAdmin').AdminRouter;
const User = require('./src/routes/rUser').UserRouter;
const MotionR = require('./src/routes/rMotion').MotionRouter;

const corsOpts = require('./src/config/cfCors').corsOpts;
const dutil = require('./src/util/dutil');

const {Motion} = require('./src/models/mWorkout');

app.use(cors(corsOpts));

// First Entry Point
app.use('/', (req,res,next) => {
    var query = (req.query) ? req.query : {};
    console.log(`${req.method} on ${req.path}`);
    next();
})


//Router Mounting
app.use('/login/', Login);
app.use('/workout/', Workout);
app.use('/admin/', Admin);
app.use('/user/', User);
app.use('/motion/', MotionR);



app.use((err,req,res,next) => 
    handleError(err,req,res,next)
); // Error handling

//Listen port
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
load_mongo();

async function load_mongo(){
    try {
        await mongoose.connect(process.env.MONGO_URL); //initialize databse here
        console.log("Connected to Mongodb");

        try{
            const count = await Motion.estimatedDocumentCount()
            if(count < 144){
                try{
                    await Motion.deleteMany({});
                }
                catch(e){
                    console.error(e.message);
                }
                console.log("adding in motions");
                try{
                    const input = await dutil.GetMotionArray();
                    console.log(`Length of input : ${input.length}`);
                    Motion.create(input)
                }
                catch(e){console.log(e.message)}
            }
        }
        catch(e){
            console.log(e.message);
        }
        

      }
      catch(er){
        console.log(er);
      }
    
    try{
        const count = await Motion.estimatedDocumentCount();
        console.log(`Count After adding ${count} / 149`);
    }
    catch(e){
        console.log(e.message);
    }
}



function handleError(err, req, res, next) {
    console.log(`Error on path: ${req.path} using ${req.method}`)
    console.log(err);
    res.status(200).send({"message": err});
}