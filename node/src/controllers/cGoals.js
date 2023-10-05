const {Goals, Objectives} = require('../models/mGoals');
const { Workout } = require('../models/mWorkout');
const {GetSingleWorkoutSummary} = require('../controllers/cUser');
const { SummaryData } = require('../util/dutil');


async function CreateNewGoal(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user;
    const name = res.locals.bodyData.name !== "" ? res.locals.bodyData.name : "default"

    if(start > end){ next("Please select a end date that is after the start date")}; // make sure dates are okay
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

// return ids of all goals
async function ListGoals(req,res,next){
    const user = res.locals.user;

    try{
        const found = await Goals.find({user_id:user})
        res.send({found:found})
    }
    catch(e){
        next(e.message)
    }

}

//return ids of goals in a certain date range
async function ListGoalsRange(req,res,next){
    const user = res.locals.user;
    const {start,end} = res.locals.bodyData;

    try{
        const found = await Goals.find({user_id:user, createdAt:{$gte: new Date(start), $lte: endDate}})
        res.send({found:found})
    }
    catch(e){
        next(e.message)
    }
}

//return populated data on a single goal
async function GetGoalData(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const match = await Goals.findOne({_id:goal_id}).populate("objectives");
        res.send({goal:match})
    }
    catch(e){
        next(e.message);
    }
}

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

async function RemoveObj(req,res,next){
    const {goal_id, objective_id} = res.locals.bodyData;
    try{
        const goal = await Goals.findOneAndUpdate({_id:goal_id}, {$pull: {"objectives" : objective_id}})// pull objective off the goal
        await Objectives.deleteOne({_id:objective_id}) // delete the objective
        res.send({deleted:true})
    }
    catch(e){
        next(e.message)
    }
}

async function CompareGoal(req,res,next){
    const {goal_id} = res.locals.bodyData;
    const {user} = res.locals.user;
    try{
        const goal = await Goals.findOne({_id:goal_id}).populate("objectives");
        const {start,end} = goal;
        const workouts_in_range = await Workout.find({user_id:user,createdAt: {$gte: new Date(end), $lte: new Date(start)}})
        var data = new SummaryData();
        var goal_data= {};
        workouts_in_range.forEach((item,index)=>{
            data.total_workouts +=1;
            GetSingleWorkoutSummary(item,data);
        }) // build summary data object

        //Pull out objectives and use them to access the summary data for comparison
        goal.objectives.forEach((item,index)=>{
            switch(item.context){
                case 0:
                    goal_data[item.name] = data[item.target] - item.value
                    break;
                case 1:
                    goal_data[item.name] = data.exercise_totals[item.target] - item.value
                    break;
                case 2:
                    goal_data[item.name] = data.muscles[item.target.type][item.target.muscle] - item.value;
                case 3:
                    var key = {}
                    if(item.target.subtarget === "n"){key = "n"}
                    else{
                        const pairs = item.subtarget.split(",");

                    }
                    break;
            }

        })

    }
    catch(e){
        next(e.message)
    }
}



module.exports = {CreateNewGoal:CreateNewGoal,ListGoalsRange:ListGoalsRange,GetGoalData:GetGoalData,AddObj:AddObj,RemoveGoal:RemoveGoal,RemoveObj:RemoveObj, ListGoals:ListGoals}