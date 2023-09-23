const {Motion, UserMotion} = require("../models/mWorkout");

//List Server Approved Motions
async function ListMotions(req,res,next){
    const motions = await Motion.find({});
   // console.log(motions);
    res.send({motions:motions});
}

// List Only User Defined Motions
async function ListUserMotions(req,res,next){
    const user = res.locals.user;
    try{
       const uMotions = await UserMotion.find({user_id:user});
       res.send({motions:uMotions});    
    }
    catch(e){
        next(e.message);
    }
}

//List all user defined and approved
// Need to remap and join these dictionaries
async function ListAllMotions(req,res,next){
    const user = res.locals.user;
    try{
        const motions = await Motion.find({},"name");
        const uMotions = await UserMotion.find({user_id:user},"name");
        
        
        const cated = motions.concat(uMotions) // combine results 
        console.log(cated[cated.length-1]);
        res.send({motions: cated})
    }
    catch(e)
    {
        next(e.message);
    }
}



 // Add a user defined motion to the UserMotion Collection
async function AddUserMotion(req, res, next){
    const {name, pg, sg, desc} = req.body;
    const user = res.locals.user;
    try{
        //Check to see if name exists in our db
        var inDb = await Motion.findOne({name:name});
        console.log(inDb);
        if(!inDb){ // 
            var motion = new UserMotion({name:name,p_group:pg,s_groups:sg,desc:desc,user_id:user});
            await motion.save();

            res.send({created:true});
        }
        else{
            next("This Motion already exists in the public motions! Try searching for it");
        }
    }
    catch(e){
       next(e.message);
    }
}


// Remove a motion based on its id and its users id
async function RemoveUserMotion(req,res,next){
    const {umotion_id} = req.body;
    const user = res.locals.user;
    try{
        var removed = UserMotion.deleteOne({_id:umotion_id, user_id:user});
        res.send({deleted: removed})
    }
    catch(e){
        next(e.message);
    }
}





module.exports = {ListMotions: ListMotions, ListUserMotions:ListUserMotions, ListAllMotions:ListAllMotions,AddUserMotion:AddUserMotion, RemoveUserMotion:RemoveUserMotion}