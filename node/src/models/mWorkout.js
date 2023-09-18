const mongoose = require('mongoose');

//Get the current date as a string
const GetDate = () => {
    const date = new Date(Date.now());
    return date.toString();
}


// Schema to define a exercise movement
// The name of the motion, 
// the primary group the motion impacts, and if applicable secondary muscles
// a small description of the motion potentially
const MotionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    p_group: Number,
    s_groups: [Number],
    desc: String
})


// Represents a singular set of work done
// Number of repetitions or time held 
// additional weight added to motion
const SetSchema = new mongoose.Schema({
    rep_or_time: {
        type: Number,
        min: 1
    },
    added_weight: Number
})

// Represents a single item in the list of exercises contained by the Workout
// Motion refers to the physical movmement undertaken, as well as impacted muscles
// Sets define the volume achieved on that motion 
const ExerciseSchema = new mongoose.Schema({
    motion: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Motion'
    },
    sets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Set'}]

})

// Main Workout Log
// user_id refers to the user who created the workout
// name refers to the name of the workout, by default it will be named the current time
// created at timestamp
// updated at timestamp
// exercises is a list of ExersiseSchema objects 

const WorkoutSchema = new mongoose.Schema({
   // work: [{Type: Schema.Types.ObjectId, ref: 'Exercise'}],
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        default: GetDate,
    },
    createdAt: Date,
    updatedAt: Date,
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}]
},

    {timestamps: true}
)

// All of the Schema pertaining to Workout
const Motion = mongoose.model("Motion", MotionSchema);
const Set = mongoose.model("Set", SetSchema);
const Exercise = mongoose.model("Exercise", ExerciseSchema);
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {Workout: Workout, Motion: Motion, Exercise:Exercise, Set: Set}