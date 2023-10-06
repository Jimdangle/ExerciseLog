import { useEffect } from "react"


export default function Totals({setTarget}){
    useEffect(()=>{setTarget({target:"total_workouts"})},[])
    return(
    <div className="flex flex-row text-white">
        <p>Target: </p>
        <select name="total_select" className=" bg-slate-600" onChange={(e)=>{setTarget({target: e.target.value})}}>
                    <option value="total_workouts">Total Workouts</option>
                    <option value="total_exercises">Total Exercises</option>
                    <option value="total_sets">Total Sets</option>
        </select>   
    </div>)
}