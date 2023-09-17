const {Motion} = require("../models/mWorkout");

async function AddMotion(req, res, next){
    const {name, pg, sg, desc} = req.body;

    try{
        var motion = new Motion({name:name,p_group:pg,s_groups:sg,desc:desc});
        await motion.save();

        res.send({created:true});
    }
    catch(e){
        res.send({message:e.message});
    }
}


async function ListMotions(req,res,next){
    const motions = await Motion.find({});
    console.log(motions);
    res.send(JSON.stringify(motions));
}

async function RemoveMotion(req,res,next){
    const {name} = req.body;
    try{
        const count = await Motion.deleteOne({name:name});
        res.send({deleted:true, count:count});
    }
    catch(e){
        res.send({message:e.message});
    }
}

async function RemoveAll(res){
    try{
        const count = await Motion.deleteMany({});
        res.send({deleted:true, count:count})
    }
    catch(e){
        res.send({message:e.message});
    }

}

module.exports = {AddMotion: AddMotion, ListMotions: ListMotions, RemoveMotion: RemoveMotion, RemoveAll:RemoveAll}