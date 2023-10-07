import { TokenContext } from "../../views/Home";
import {useContext,} from 'react'

export default function GoalItem({goal, setGoal, setViewingGoal, RemoveGoal}){
    const token = useContext(TokenContext);

    
    return(
    <div className="w-auto mx-2 bg-white rounded-md pl-2 flex flex-col mt-3 justify-center" >
        <div className="flex-flex-col" onClick={()=>{setGoal(goal);setViewingGoal(true)}}>
        <h1>{goal.name ? goal.name.slice(0,15) : "No Name"}</h1>
        <h2>Start: {goal.start.toString()}</h2>
        <h2>End: {goal.end.toString()}</h2>
        </div>
        <button className="button button-e-red" onClick={()=>{RemoveGoal(goal._id)}}>Delete</button>
    </div>)
}