const mongoose = require('mongoose');

//Get the current date as a string
const GetDate = () => {
    const date = new Date(Date.now());
    return date.toString();
}

//Objective Schema
// Goals will be made up of objectives 
// Objectives define the specific targets a user wants to achieve
// context is an number in the range 0<=context<=3 and it determines where in the summaries the goal should compare
//      0: has access to total_workouts,total_exercises
//      1: has accesss to exercise_totals
//      2: has access to muscles array
//      3: has access to the exercise summary
// target will be an object (loosely controlled) that will contain target information (how to find the number we want to compare against) for a particular thing, will document as i go lol
// value will be the value the user wants to assign the target
const ObjectiveSchema = new mongoose.Schema({
    context: {
        type: Number,
        enum: [0,1,2,3],
        required: true
    },
    target: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    value:{
        type: Number,
        required: true
    },
})

const BObjectiveSchema = new mongoose.Schema({
    keys : [{type: String, required: true}],
    value:{
        type: Number,
        required: true
    }
    
})

const GoalSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    start: {
        type: Date,
        required: true
    },
    end: {
        type:Date,
        required: true,  
    },
    objectives: [{type: mongoose.Schema.Types.ObjectId, ref:'Objectives'}],
    bobjectives: [{type: mongoose.Schema.Types.ObjectId, ref:'BObjectives'}]
})
GoalSchema.index({user_id:1,start:1,end:1,name:1}, {unique: true}); // a unique goal should have different dates, and name per user 

const BObjectives = mongoose.model("BObjectives", BObjectiveSchema)
const Objectives = mongoose.model("Objectives", ObjectiveSchema);
const Goals = mongoose.model("Goals", GoalSchema);

module.exports = {Objectives:Objectives, Goals:Goals}