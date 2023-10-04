export default function Totals({setTarget}){
    return(
    <div className="flex flex-row text-white">
        <p>Target: </p>
        <select name="total_select" className="w-24 bg-slate-600" onChange={(e)=>{setTarget({target: e.target.value})}}>
                    <option value="total_workouts">Total Workouts</option>
                    <option value="total_exercises">Total Exercises</option>
                    <option value="total_sets">Total Sets</option>
        </select>   
    </div>)
}