const mongoose = require('mongoose')
const DefaultUsers = require('../config/SeedData').DefaultUsers;
const DefaultWorkouts = require('../config/SeedData').DefaultWorkouts;
const Motion = require('../models/mWorkout').Motion;
const mUser = require('../models/mUsers');
const { MakeNewUser } = require('./cLogin');

async function Wipe(req,res,next){
    const allModels = mongoose.modelNames();
    try{
        const models = mongoose.modelNames();
        for(const modelName of models){
            const del = await deleteItemsByModel(modelName) 
            if(!del.acknowledged){
                return next({code:500,message:'Couldnt ack'});
            }
        }
        return res.send({deleted:true})
    }
    catch(e)
    {
        console.log(e)
        return next({code:500,message:"Could not wipe"})   
    }
    
}

/* Request Controller for clearing a specified model*/
async function ClearModel(req,res,next){
    const {model_name} = res.locals.bodyData;
    const error = await deleteItemsByModel(model_name);
    if(error instanceof Error){
        next({code:500,message:"Model clearing problem"})
    }
    else{
        res.send({deleted:true})
    }
}

/* Request controller for loading seed data */
async function Load(req,res,next){
    try{
        const loadMotions = await Motion.insertMany(DefaultWorkouts.workouts);
        for(const user in DefaultUsers.users){
            const item = DefaultUsers.users[user]
            const added = await MakeNewUser(item.email,item.password,item.username)
        }

        res.send({loaded:true, motion_ids: loadMotions.insertedIds })
    }
    catch(e){
        next({code:500,message:e.message})
    }
}

// Delete by model name 
async function deleteItemsByModel(model_name){
    try{
        const model = mongoose.model(model_name)
        const all = await model.deleteMany({});
        return all
    }
    catch(e){
        console.log(e)
        return e
    }
}


module.exports = {Wipe, ClearModel,Load}