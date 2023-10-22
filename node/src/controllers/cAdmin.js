const {Motion} = require("../models/mWorkout");

/**
 * Add a Motion to mongodb with the following keys passed in the request body
 * @keys : name:string, pg:int, sg:List:int, desc:string
 * @param name name of the motion
 * @param pg primary muscle group of the motion (translates to a string on frontend)
 * @param sg list of muscle groups that are aslo affected
 * @param desc optional description of the motion
 * 
 * Sends a response : {created:true} when added, or {message:"error message"} when failed
 */
async function AddMotion(req, res, next){
    const {name, pg, sg, desc} = req.body;

    try{
        var motion = new Motion({name:name,p_group:pg,s_groups:sg,desc:desc});
        await motion.save();

        res.send({created:true});
    }
    catch(e){
        next({message:e.message,code:500});
    }
}

/**
 * List all motions that are contained on mongo
 * Sends a response {motions:List of motions} 
 */
async function ListMotions(req,res,next){
    const motions = await Motion.find({});
    console.log(motions);
    res.send({motions:motions});
}

/**
 * Remove a motion based on its name
 * @keys : name:string
 * Sends a response {deleted:true, count:number} when delete is successful, count should always be 1, or 0
 * Sends {message:"error message"} when can't delete
 */
async function RemoveMotion(req,res,next){
    const {name} = req.body;
    try{
        const count = await Motion.deleteOne({name:name});
        res.send({deleted:true, count:count});
    }
    catch(e){
        next({message:e.message,code:500});
    }
}


/**
 * Remove all motions from the mongodb
 */
async function RemoveAll(res){
    try{
        const count = await Motion.deleteMany({});
        res.send({deleted:true, count:count})
    }
    catch(e){
        next({message:e.message,code:500});
    }

}

module.exports = {AddMotion: AddMotion, ListMotions: ListMotions, RemoveMotion: RemoveMotion, RemoveAll:RemoveAll}