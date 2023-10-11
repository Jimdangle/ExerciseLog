const {Goals, Objectives} = require('../models/mGoals');
const {Workout} = require('../models/mWorkout.js');
const {GenerateSummary} = require('../controllers/cUser');
const { SummaryData, SummaryAcces } = require('../util/dutil');
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
        res.send({created:true,baggage:added})
    }
    catch(e){
        next(e.message)
    }

}

/**Remove a goal */
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

/**return ids of all goals for a user*/
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

/**return ids of goals in a certain date range for a user */
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

/**return populated data on a single goal for a user*/
async function GetGoalData(req,res,next){
    const {goal_id} = res.locals.bodyData;
    try{
        const match = await Goals.findOne({_id:goal_id}).populate("objectives");
        
        const fuckaround = match.objectives.map((item) => {
            
            return humanObjective(item)
        })
        
        res.send({goal:match,translated: fuckaround})
    }
    catch(e){
        next(e.message);
    }
}

/**Add an Objective to a goal for a user*/
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
            
            next(e.message);
        }
    }
    catch(e){
        next(e.message)
    }
}


/**Remove an objective from a goal for a user */
async function RemoveObj(req,res,next){
    const {goal_id, objective_id} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        const goal = await Goals.findOneAndUpdate({_id:goal_id,user_id:user}, {$pull: {"objectives" : objective_id}})// pull objective off the goal
        await Objectives.deleteOne({_id:objective_id}) // delete the objective
        res.send({deleted:true})
    }
    catch(e){
        next(e.message)
    }
}


/**Compare a users goal against workouts that are in that goals range */
async function CompareGoal(req,res,next){
    const {goal_id} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        //locate this goal
        const goal = await Goals.findOne({_id:goal_id}).populate("objectives");
        
        const goal_data = await CompareAGoal(goal,user);

        res.send({difference: goal_data});

    }
    catch(e){
        console.log(e);
        next(e.message)
    }
}


async function RecentGoals(req,res,next){
    const time = Date.now();
    const user = res.locals.user;
    const {n} = res.locals.bodyData; // number to return

    //Locate maybe 5 goals
    try{
        const findGoals = await Goals.find({user_id:user, start:{$lte: new Date(time)}, end: {$gte : new Date(time)}}).populate("objectives").sort({end: 1}).limit(n) // find goals that are currently active, sort by lowest end date and only return n reuslts
     
        var out_data = []
        for(const goal of findGoals){
            const data = await GenerateGoalSummary(goal,user);
            const english_objectives = goal.objectives.map((objective) => {return humanObjective(objective)})
            out_data.push({name:goal.name, data:data, objectives: english_objectives, end: goal.end})
        }
        res.send({goal_data:out_data})
        
    }
    catch(e)
    {
        next(e.message)
    }
}


//Want to return some kind of overall % completion, as well as individual 
async function GenerateGoalSummary(goal,user){
    const goal_data = await CompareAGoal(goal, user); // array of objectives from this goal

    if(!goal_data){throw new Error("Could not generate goal data")}

    const percents = Object.keys(goal_data).map( (key,index) => { // get rounded percentages for objective completion
        
        const fraction = goal_data[key][0]/goal_data[key][1]
        return Math.round( (fraction)*100)/100;
    });

    const complete = percents.reduce( (total,i) => {return total+( (i>=1.0 ? 1 : 0))},0) // add 1 if our percent is at 1.0 or higher
    const objective_completion = Math.round((complete / percents.length)*100)/100; // get the percentage for how many we have completed
    
    
    
    return {overall_completion: objective_completion, percents: percents, obj_data:goal_data}
}

/**  Compare a singular goal with out using the request data (a goal object, user id), I want this to return maybe a % towards the goal completion or something 
 *  @returns {Object} Goal Data: [ [summary_value,objective_value]]
*/
async function CompareAGoal(goal,user){
    
    var goal_data= {};
    const {start,end} = goal;

    //Generate our summary
    const data = await GenerateSummary(user,start,end)
    
    //Pull out objectives and use them to access the summary data for comparison
    
    
    if(data && goal.objectives.length > 0){
        
        goal.objectives.forEach((item,index)=>{
            
            
            goal_data[index] = [parseObjective(item,data),item.value];
        })
    }   

    return goal_data;


}

/**  Parse a objective of a goal, given you have the objective and current summary information 
 * @returns {Number} The value contained in the summary pointed to by our objectives context, and target
*/
function parseObjective(objective, data){
    const target = objective.target;
    
    switch(objective.context){
        case 0: //Type 0 -> We are accessing the first layer of the summary object
            return data[target.target];
        case 1: //Type 1 -> We are accessing one of the exercise_totals, the target tells us which type of total
            return data.exercise_totals[target.target];
        case 2://Type 2 -> We are accessing a particular mucle target for a particular type
            return data.muscles[target.type][target.muscle];
        case 3://Type 3 -> We are targeting something in the exercise_summary object
            if(target.subTarget === "n"){ //sets is easy
                return data.exercise_summary[target.exercise_name]["n"]
            }
            else if(!target.subTarget){return 0}
            else{ // Basically all the options of the select on the front end correspond to this
                
                const [key,subkey] = target.subTarget.split(",");
                const [l,r] = (key==="r" ? ["values",0] :  ["weights",1]) // if we are looking at values aka reps we want the first element of the array contained in the obj
                
                return data.exercise_summary[target.exercise_name] ? (subkey!=="avg" ? data.exercise_summary[target.exercise_name][l][subkey][r] : data.exercise_summary[target.exercise_name][l][subkey] ): 0 //return value unless we arent in there then just say 0
            }
    }
}

function humanObjective(objective){
    const target = objective.target;
   
    switch(objective.context){
        case 0: //Type 0 -> We are accessing the first layer of the summary object
            switch(target.target){
                case "total_workouts":
                    return "Total Workouts";
                case "total_exercises":
                    return "Total Exercises";
                case "total_sets":
                    return "Total Sets"
            }
        case 1: //Type 1 -> We are accessing one of the exercise_totals, the target tells us which type of total
            return "Total" + EX_TYPES[target.target]
        case 2://Type 2 -> We are accessing a particular mucle target for a particular type
            return EX_MUSCLES[target.muscle] + " " + EX_TYPES[target.type]
        case 3://Type 3 -> We are targeting something in the exercise_summary object
            if(target.subTarget === "n"){ //sets is easy
                return "Total " + exercise_name + " sets"
                
            }
            else if(!target.subTarget || !target.type){return ""}
            else{ // Basically all the options of the select on the front end correspond to this
                
                const [key,subkey] = target.subTarget.split(",");
                const l = (key==="r" ? (target.type===0 ? "Reps" : "Time") :  (target.type===0 ? "Weight" : "Dist")) // if we are looking at values aka reps we want the first element of the array contained in the obj
                return target.exercise_name + " " + l + " " +subkey
            }
    }
}



module.exports = {RecentGoals:RecentGoals, CompareGoal:CompareGoal,CreateNewGoal:CreateNewGoal,ListGoalsRange:ListGoalsRange,GetGoalData:GetGoalData,AddObj:AddObj,RemoveGoal:RemoveGoal,RemoveObj:RemoveObj, ListGoals:ListGoals}