const User = require('../models/mUsers.js')
const {Workout} = require('../models/mWorkout.js')

//Get user information based on the presence of the user token in the header 
async function GetUser(req,res,next){
    const user = res.locals.user;

    try{
        const foundUser = await User.findOne({_id:user},"email username");
        console.log(`User: ${user} : ${foundUser}`);
        res.send({user:foundUser})
    }
    catch(e){
        next(e.message);
    }
}


async function GetWorkoutSummary(req,res,next){
    const user = res.locals.user;
    try{
        const usersWorkouts = await Workout.find({user_id:user}).populate({path:"exercises", populate: {path: "motion sets"}});
        var userSummary = {count:0,motion_count:0,motions:{}}
        usersWorkouts.forEach( (workout) => {
            console.log(workout);
            userSummary.count+=1;
            workout.exercises.forEach( (exercise) => {
                userSummary.motion_count+=1;
                if(userSummary.motions[exercise.motion.name]){userSummary.motions[exercise.motion.name]+=1}
                else{userSummary.motions[exercise.motion.name]=1}
            })
        })
        console.log(userSummary);
        res.send({summary:userSummary})
        

    }
    catch(e){
        next(e.message);
    }
}

module.exports = {GetUser:GetUser, GetWorkoutSummary:GetWorkoutSummary}