const mongoose = require('mongoose')


async function Wipe(req,res,next){
    const allModels = mongoose.modelNames();
    const results = allModels.map(async(model_name)=>{await deleteItemsByModel(model_name)})

    const error = results.reduce((acum,val)=> {
        if(acum instanceof Error || val instanceof Error){
            return acum
        }
        else{
            return false
        }
    })

    if(error){
        next({code:500,message:"problem wiping"})
    }
    else{
        res.send({deleted:true})
    }
}

async function ClearModel(req,res,next){
    const {model_name} = res.locals.bodyData;
    const error = await deleteItemsByModel(model_name);
    if(error instanceof Error){
        next({code:500,message:"Model clearing problem"})
    }
    else{
        res.send({deleted:true})
    }
}

// Delete by model name 
async function deleteItemsByModel(model_name){
    try{
        const model = mongoose.model(model_name)
        const all = await model.deleteMany({});
        return (all.deletedCount > 0 ? true : false)
    }
    catch(e){
        return e
    }
}

module.exports = {Wipe, ClearModel}