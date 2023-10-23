const {Motion, UserMotion} = require("../models/mWorkout");

//List Server Approved Motions
async function ListMotions(req,res,next){
    const motions = await Motion.find({});
   // console.log(motions);
    return res.send({motions:motions});
}

// List Only User Defined Motions
async function ListUserMotions(req,res,next){
    const user = res.locals.user;
    try{
       const uMotions = await UserMotion.find({user_id:user});
       return res.send({motions:uMotions});    
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}

//List all user defined and approved
// Need to remap and join these dictionaries
async function ListAllMotions(req,res,next){
    const user = res.locals.user;
    try{
        const motions = await Motion.find({},"name type muscles")
        const uMotions = await UserMotion.find({user_id:user},"name type muscles");
        
        
        const cated = motions.concat(uMotions) // combine results 
       
        return res.send({motions: cated})
    }
    catch(e)
    {
        return next({message:e.message,code:500});
    }
}



 // Add a user defined motion to the UserMotion Collection
async function AddUserMotion(req, res, next){
    const {name, type, muscles, desc} = req.body;
    const description = desc ? desc : "" // just incase we dont get one
    const user = res.locals.user;
    console.log(muscles);
    try{
        //Check to see if name exists in our db
        var inDb = await Motion.findOne({name:name});
        console.log(inDb);
        if(!inDb){ // 
            var motion = new UserMotion({name:name,type:type, muscles:muscles,desc:description,user_id:user});
            await motion.save();

            return res.send({created:true});
        }
        else{
            return next({message:'Motion already exists',code:409});
        }
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}


// Remove a motion based on its id and its users id
async function RemoveUserMotion(req,res,next){
    const {umotion_id} = req.body;
    const user = res.locals.user;
    try{
        var removed = UserMotion.deleteOne({_id:umotion_id, user_id:user});
        return res.send({deleted: removed})
    }
    catch(e){
        return next({message:e.message,code:500});
    }
}





module.exports = {ListMotions: ListMotions, ListUserMotions:ListUserMotions, ListAllMotions:ListAllMotions,AddUserMotion:AddUserMotion, RemoveUserMotion:RemoveUserMotion}