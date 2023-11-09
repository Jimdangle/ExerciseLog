
class SummaryData   {
    constructor(){
        this.total_workouts=0; // total amount of workouts
        this.total_exercises=0 // total amount of exercises
        this.total_sets=0 // total amount of sets
        this.exercise_totals=[0,0,0] // Calculated by summing the product of values*weights for all exercises and assign them to a position in the array based on the type of exercise (lift,cardio,hold)
        this.muscles=[{},{},{}] //   contains impact using the exercise total * the value contained in each exercises muscle array, allocated per exercise type in the array
        this.muscle_z = [{},{},{}] // Calculate z-score for the impacts in each type
        this.exercise_summary={} // contains key value pairs of the following type : <exercise_name:string> : { values: {min:Number,max:Number,avg:Number}, weights: {min:Number,max:Number,avg:Number}, muscles: {<muscle_name:string>:Number,...}}
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
