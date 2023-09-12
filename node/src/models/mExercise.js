const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: String,
    primaryMuscle: { type: String, required: true },
    secondaryMuscle: String,
})

module.exports = mongoose.model("Exercise", ExerciseSchema);