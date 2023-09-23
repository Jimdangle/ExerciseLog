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
        const usersWorkouts = await Workout.find({user_id:user}).populate({path:"exercises", populate: {path: "motion.motion motion.umotion sets"}});
        var userSummary = {count:0,motion_count:0,motions:{}}
        usersWorkouts.forEach( (workout) => {
            console.log(workout);
            userSummary.count+=1;
            workout.exercises.forEach( (exercise) => {
                userSummary.motion_count+=1;
                var properName = exercise.motion.motion ? exercise.motion.motion.name : exercise.motion.umotion.name
                if(userSummary.motions[properName]){userSummary.motions[properName]+=1}
                else{userSummary.motions[properName]=1}
            })
        })
        console.log(userSummary);
        res.send({summary:userSummary})
        

    }
    catch(e){
        next(e.message);
    }
}

async function ChangeUsername(req,res,next){
    const {username} = res.locals.bodyData;
    const user = res.locals.user;
    try{
        const updatedUser = await User.findOneAndUpdate({_id:user},{$set: {username:username}});
        console.log(updatedUser);
        res.send({user:updatedUser});
    }
    catch(e){
        next(e.message);
    }
}

module.exports = {GetUser:GetUser, GetWorkoutSummary:GetWorkoutSummary,ChangeUsername:ChangeUsername}