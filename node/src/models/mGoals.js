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
// target will be a string(that can be converted into a number for array access)
// value will be the value the user wants to assign the target
const ObjectiveSchema = new mongoose.Schema({
    context: {
        type: Number,
        enum: [0,1,2,3],
        required: true
    },
    target: {
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: true
    }
})


const GoalSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String},
    start: {
        type: Date,
        required: true
    },
    end: {
        type:Date,
        required: true,  
    },
    objectives: [{type: mongoose.Schema.Types.ObjectId, ref:'Objectives'}]

})


const Objectives = mongoose.model("Objectives", ObjectiveSchema);
const Goals = mongoose.model("Goals", Goals);

module.exports = {Objectives:Objectives, Goals:Goals}