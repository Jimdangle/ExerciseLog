import { TokenContext } from "../../views/Home";
import {useState, useEffect, useContext} from 'react';
import ObjectiveItem from "./Objectives/ObjectiveItem";
import ObjectiveAdder from "./Objectives/ObjectiveAdder";

export default function GoalPage({goal,setViewingGoal}){
    const token = useContext(TokenContext);
    const [addingObjective, setAddingObjective] = useState(false)

    

    return (
    <div className="flex flex-col">
        <h1 className="text-center text-white font-semibold">{goal.name}</h1>
        {goal.objectives.map((item,index)=>{
            
            return <ObjectiveItem key={index+"llcoolObj"} objective={item}></ObjectiveItem>
        })}
        <button className="place-self-center button button-e-green" onClick={()=>{setAddingObjective(!addingObjective)}}>Add Objective</button>
        {addingObjective ? <ObjectiveAdder goal_id={goal._id}></ObjectiveAdder> : ""}
        <button className="button button-e-red" onClick={()=>{setViewingGoal(false)}}>Return</button>
    </div>)

}