const {Goals, Objectives} = require('../models/mGoals');
const {Workout} = require('../models/mWorkout.js');
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


// Compare a users goal against workouts that are in that goals range
async function CompareGoal(req,res,next){
    const {goal_id} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        //locate this goal
        const goal = await Goals.findOne({_id:goal_id}).populate("objectives");
        const {start,end} = goal;

        //Find workouts within the range
        const workouts_in_range = await Workout.find({user_id:user,createdAt:{$gte: new Date(start), $lte: new Date(end)}}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        
        var data = new SummaryData();
        var goal_data= {};
        console.log(`Comparing Goals found ${workouts_in_range.length} workouts between Start: ${start} / End: ${end}`)
        workouts_in_range.forEach((item,index)=>{
            data.total_workouts +=1;
            GetSingleWorkoutSummary(item,data);
        }) // build summary data object
        //console.log(data);
        //Pull out objectives and use them to access the summary data for comparison
        if(workouts_in_range.length > 0 ){
            goal.objectives.forEach((item,index)=>{
                //console.log(item)
                goal_data[index] = parseObjective(item,data);
            })
        }   
        res.send({difference: goal_data});

    }
    catch(e){
        next(e.message)
    }
}


function parseObjective(objective, data){
    const target = objective.target;
    
    switch(objective.context){
        case 0:
            
            return [data[target.target] - objective.value, data[target.target]]
        case 1:
            
            return [data.exercise_totals[target.target] - objective.value, data.exercise_totals[target.target] ]
            
        case 2:
            
            return [data.muscles[target.type][target.muscle] - objective.value, data.muscles[target.type][target.muscle]]
        case 3:
            if(target.subTarget === "n"){
                
                return [data.exercise_summary[target.exercise_name]["n"] - objective.value, data.exercise_summary[target.exercise_name]["n"]]
            }
            else{
                const [key,subkey] = target.subTarget.split(",");
                
                return [data.exercise_summary[target.exercise_name][(key==="r" ? "values" :  "weights")][subkey][(key==="r" ? 0 : 1)] - objective.value, data.exercise_summary[target.exercise_name][(key==="r" ? "values" :  "weights")][subkey][(key==="r" ? 0 : 1)]]
            }
    }
}


module.exports = {CompareGoal:CompareGoal,CreateNewGoal:CreateNewGoal,ListGoalsRange:ListGoalsRange,GetGoalData:GetGoalData,AddObj:AddObj,RemoveGoal:RemoveGoal,RemoveObj:RemoveObj, ListGoals:ListGoals}