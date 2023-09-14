const mongoose = require('mongoose');

//const exercise = require('../models/mExercise');

const workoutSchema = new mongoose.Schema({
   // work: [{Type: Schema.Types.ObjectId, ref: 'Exercise'}],
    username: String, 
    
},

    {timestamps: true}
)



module.exports = mongoose.model("Workout", workoutSchema);