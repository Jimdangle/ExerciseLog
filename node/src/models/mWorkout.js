const mongoose = require('mongoose');
const MuscleInformation = require('../config/Muscles').MuscleInformation

const validMuscles = Object.keys(MuscleInformation.Muscles) // List of valid muscles
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
    type: {
        type:Number,
        min:0,
        max:2
    },
    muscles: {
        type: Map,
        of: Number,
        validate: {
          validator: function (value) {
            
            for (const key in value.keys()) {
              
              sum+=value[key];
              if (!validMuscles.includes(key)) {
                console.log(`${key} not found in muscle data`)
                return false;
              }
              console.log(`${key} : ${sum}`)
            }
            
            return true;
          },
          message: 'Invalid muscle names in muscles',
        },
      },
    desc: String
})

// These do not need unique names 
const UserMotionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: false
    },
    type: {
        type:Number,
        min:0,
        max:2
    },
    muscles: {
      type: Map,
      of: Number,
      validate: {
        validator: function (value) {
          
          for (const key in value.keys()) {
            
            sum+=value[key];
            if (!validMuscles.includes(key)) {
              console.log(`${key} not found in muscle data`)
              return false;
            }
            console.log(`${key} : ${sum}`)
          }
          
          return true;
        },
        message: 'Invalid muscle names in muscles',
      },
    },
    desc: String,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

})
UserMotionSchema.index({name:1,user_id:1}, {unique: true}); //create a "unique" pairing, so users cant make duplicates of items



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
        motion: {type: mongoose.Schema.Types.ObjectId, ref: 'Motion' },
        umotion: {type: mongoose.Schema.Types.ObjectId, ref: 'UserMotion'}
    },
    sets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Set'}],
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:'Users'}

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
const UserMotion = mongoose.model("UserMotion", UserMotionSchema);


module.exports = {Workout: Workout, Motion: Motion, Exercise:Exercise, Set: Set, UserMotion: UserMotion}