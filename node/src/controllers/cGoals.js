const {Goals, Objectives} = require('../models/mGoals');

const {GenerateSummary} = require('../controllers/cUser');

const { EX_TYPES, EX_MUSCLES } = require('../util/goalutil');

/**Create a new goal */
async function CreateNewGoal(req,res,next){
    const {start,end} = res.locals.bodyData;
    const user = res.locals.user;
    const name = res.locals.bodyData.name !== "" ? res.locals.bodyData.name : "default"

    if(start > end){ next("Please select a end date that is after the start date")}; // make sure dates are okay
   
    try{
        const newGoal = new Goals({user_id:user,name:name,start:new Date(start),end:new Date(end)})

        const added = await newGoal.save();
        console.log(added)
        return res.send({created:true,baggage:added})
    }
    catch(e){
        return next({message:e.message,code:500});
    }

}

/**Remove a goal */
async function RemoveGoal(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const del = await Goals.deleteOne({_id:goal_id});
        return res.send({deleted:true,baggage:del})
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

/**return ids of all goals for a user*/
async function ListGoals(req,res,next){
    const user = res.locals.user;

    try{
        const found = await Goals.find({user_id:user})
        return res.send({found:found})
    }
    catch(e){
        return next({message:e.message,code:500});
    }

}

/**return ids of goals in a certain date range for a user */
async function ListGoalsRange(req,res,next){
    const user = res.locals.user;
    const {start,end} = res.locals.bodyData;

    try{
        const found = await Goals.find({user_id:user, createdAt:{$gte: new Date(start), $lte: endDate}})
        return res.send({found:found})
    }
    catch(e){
       return next({message:e.message,code:500});
    }
}

//Get a comprehensive summary of goals 
async function GetGoalHistory(req,res,next){
    const user = res.locals.user;
    try{
        const found = await Goals.find({user_id:user}).populate('objectives')
        let objectiveCompletion = []
        for(let goali in found){
            const goal = found[goali]
            const summary = await GenerateSummary(user,goal.start,goal.end);
            const completion= ObjectiveCompletion(goal.objectives,summary)
            objectiveCompletion.push(completion)
        }
        console.log(objectiveCompletion)
        return res.send({goals:found,objectiveCompletion:objectiveCompletion})

    }
    catch(e){
        return next({message:e.message,code:500})
    }
}


/**return populated data on a single goal for a user*/
async function GetGoalData(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const match = await Goals.findOne({_id:goal_id}).populate("objectives");
        
       return res.send({goal:match})
    }
    catch(e){
       return next({message:e.message,code:500});
    }
}

function ObjectiveCompletion(objectives,summary){
    const objectiveCompletion = objectives.map((objective)=>{ // calculate our objective completion %s
        const val = summary.search(objective.target) ?? 0;
        console.log(val)
        const completion = Math.round((val/objective.value)*10)/10
        return completion < 1 ? completion : 1
    })
    return objectiveCompletion
}

async function CompareObjectiveData(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const goal = await Goals.findOne({_id:goal_id}).populate("objectives"); // find the goal
        const {start,end,objectives} = goal; // get vars
        const summary = await GenerateSummary(res.locals.user,start,end); // create our summary
        
        const objectiveCompletion = ObjectiveCompletion(objectives,summary)
        console.log(`Completion`);
        console.log(objectiveCompletion);

        res.send({objectives:objectives, objectiveCompletion:objectiveCompletion})
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

/**Add an Objective to a goal for a user*/
async function AddObj(req,res,next){
    const {target,value,goal_id} = res.locals.bodyData;

    try{
        const obj = new Objectives({target:target,value:value});
        const added_obj = await obj.save(); // save our objective

        
        const assocGoal = await Goals.findOneAndUpdate({_id:goal_id,user_id:res.locals.user},{$push: {"objectives" : added_obj._id}});
        return res.send({added:true, objectives:assocGoal.objectives});
        
        
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}


/**Remove an objective from a goal for a user */
async function RemoveObj(req,res,next){
    const {goal_id, objective_id} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        const goal = await Goals.findOneAndUpdate({_id:goal_id,user_id:user}, {$pull: {"objectives" : objective_id}})// pull objective off the goal
        await Objectives.deleteOne({_id:objective_id}) // delete the objective
        return res.send({deleted:true})
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

/**
 * Need to figure out a (good) way to let the users know what kind of things they could set objectives for
 * - total_workouts,total_exercises, and total_sets are fairly trivial, the problem comes with exercise_summary and muscles/muscle_z because they might have different keys in them
 * - need 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function GetOptions(req,res,next){
    
}




module.exports = {GetGoalHistory,CompareObjectiveData, CreateNewGoal:CreateNewGoal,ListGoalsRange:ListGoalsRange,GetGoalData:GetGoalData,AddObj:AddObj,RemoveGoal:RemoveGoal,RemoveObj:RemoveObj, ListGoals:ListGoals}