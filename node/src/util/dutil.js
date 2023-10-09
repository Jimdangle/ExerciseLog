//database util

const fs = require('fs');
const path = require('node:path');
const { type } = require('os');


const pp = path.join(__dirname,'../','config','workouts.txt')
console.log(pp);
async function GetMotionArray(){
    var seen = {}
    try{
        const data = fs.readFileSync(pp,'utf-8');
        //console.log(typeof data);
        var motionsRaw = data.split('\r\n')
        motionsRaw.pop();

        //console.log(motionsRaw)
        const motionsMapped = motionsRaw.map((item)=>{
            const splitMotion = item.split(":");
            console.log(splitMotion[2])
            var muscle_map = splitMotion[2].split(",").map((item)=>{return Number(item)})
            return {name:splitMotion[0], type: Number(splitMotion[1]), muscles:muscle_map, desc:splitMotion[3]}
        })
        

        return motionsMapped.filter((item)=>{var k = item.name; return seen.hasOwnProperty(k) ? false : (seen[k]=true)})
       
    }
    catch(e){
        console.log(e.message);
        return [];
    }
}

class SummaryData   {
    constructor(){
        this.total_workouts=0;
        this.total_exercises=0
        this.total_sets=0
        this.exercise_totals=[0,0,0]
        this.muscles=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
        this.exercise_summary={}
    }
}

/**Access the summary object better
 * @param {SummaryData} data : summary data object
 * @param {List} keys : a list of keys in order telling us how to access the object 
 *  */  
function SummaryAcces(data,keys){
    if(!data || !keys){return null}

    const val = keys.reduce((acum,val)=>{return acum[val] ? acum[val] : acum},data)
    console.log(`Summary access on ${keys} return ${val}`)
    return typeof val== Number? val : null;
}

module.exports = {GetMotionArray:GetMotionArray,SummaryData:SummaryData, SummaryAcces:SummaryAcces}
const p2p = path.join(__dirname,'../','config','workouts_out.txt')
async function WriteArray(){
    const inp = await GetMotionArray();
    var map = inp.map( (item) => {
       return `${item.name}\n\t${item.p_group}\n\t[${item.s_groups}]\n\t${item.desc}\n\n`
    })
    map = map.join("\n")
   

    fs.writeFileSync(p2p,map, (err)=> {throw err})
}