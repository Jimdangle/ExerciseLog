
class SummaryData   {
    constructor(){
        this.total_workouts=0;
        this.total_exercises=0
        this.total_sets=0
        this.exercise_totals=[0,0,0]
        this.muscles=[{},{},{}] // 3 objects keys = muscle name,  value = impact, position in array = type  
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

module.exports = {SummaryData:SummaryData, SummaryAcces:SummaryAcces}
