import { useEffect } from "react"

export default function Volumes({setTarget}){
    
    useEffect(()=>{setTarget({target:0})},[])
    return(
    <div className="flex flex-row text-white">
        <p>Volume Type: </p>
        <select name="volume_select" className=" bg-slate-600" onChange={(e)=>{setTarget({target: e.target.value})}}>
                    <option value="0">Total Lifts</option>
                    <option value="1">Total Cardio</option>
                    <option value="2">Total Holds</option>
        </select>   
    </div>)
}