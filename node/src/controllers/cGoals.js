const {Goals, Objectives} = require('../models/mGoals');


async function CreateNewGoal(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user;
    const name = res.locals.bodyData.name !== "" ? res.locals.bodyData.name : "default"
    console.log(res.locals.bodyData)
    try{
        const newGoal = new Goals({user_id:user,name:name,start:new Date(start),end:new Date(end)})

        const added = await newGoal.save();
        res.send({created:true,baggage:added})
    }
    catch(e){
        next(e.message)
    }

}


async function RemoveGoal(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const del = await Goals.deleteOne({_id:goal_id});
        res.send({deleted:true,baggage:del})
    }
    catch(e){
        next(e.message);
    }
}

async function ListGoals(req,res,next){
    const user = res.locals.user;

    try{
        const found = await Goals.find({user_id:user}).populate("objectives")
        res.send({found:found})
    }
    catch(e){
        next(e.message)
    }

}

async function ListGoalsRange(req,res,next){}

async function AddObj(req,res,next){
    const {context,target,value,goal_id} = res.locals.bodyData;

    try{
        const obj = new Objectives({context:context,target:target,value:value});
        const added_obj = await obj.save(); // save our objective

        try{
            const assocGoal = await Goals.findOneAndUpdate({_id:goal_id,user_id:res.locals.user},{$push: {"objectives" : added_obj._id}});
            res.send({added:true, objectives:assocGoal.objectives});
        }
        catch(e){
            console.log('Error adding objective to goal')
            console.log(e);
            next(e.message);
        }
    }
    catch(e){
        next(e.message)
    }
}

async function RemoveObj(req,res,next){}



module.exports = {CreateNewGoal:CreateNewGoal,AddObj:AddObj,RemoveGoal:RemoveGoal,RemoveObj:RemoveObj, ListGoals:ListGoals}