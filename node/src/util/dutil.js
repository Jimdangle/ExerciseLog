//database util

const fs = require('fs').promises;
const path = require('node:path');
const { type } = require('os');


async function loadMuscles(){
    const pp = path.join(__dirname,'../','config','Muscles.json')
    try{
        const data = await fs.readFile(pp, 'utf8')
        
        const jsonData = JSON.parse(data);
            // Use the 'jsonData' object in your code
        console.log(jsonData);
        return jsonData
    }
    catch(e){
        console.error('Error reading JSON file:', e);
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

module.exports = {SummaryData:SummaryData, SummaryAcces:SummaryAcces,loadMuscles}
const p2p = path.join(__dirname,'../','config','workouts_out.txt')
async function WriteArray(){
    const inp = await GetMotionArray();
    var map = inp.map( (item) => {
       return `${item.name}\n\t${item.p_group}\n\t[${item.s_groups}]\n\t${item.desc}\n\n`
    })
    map = map.join("\n")
   

    fs.writeFileSync(p2p,map, (err)=> {throw err})
}