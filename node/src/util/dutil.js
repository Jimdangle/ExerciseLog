//database util

const fs = require('fs');
const path = require('node:path')


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
            const splitMotion = item.split(",");
            console.log(splitMotion[0])
            return {name:splitMotion[0], p_group: Number(splitMotion[1]), s_groups:[Number(splitMotion[2])], desc:splitMotion[3]}
        })
        

        return motionsMapped.filter((item)=>{var k = item.name; return seen.hasOwnProperty(k) ? false : (seen[k]=true)})
       
    }
    catch(e){
        console.log(e.message);
        return [];
    }
}

module.exports = {GetMotionArray:GetMotionArray}
const p2p = path.join(__dirname,'../','config','workouts_out.txt')
async function WriteArray(){
    const inp = await GetMotionArray();
    var map = inp.map( (item) => {
       return `${item.name}\n\t${item.p_group}\n\t[${item.s_groups}]\n\t${item.desc}\n\n`
    })
    map = map.join("\n")
   

    fs.writeFileSync(p2p,map, (err)=> {throw err})
}