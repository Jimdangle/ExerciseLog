import { TokenContext } from "../../views/Home";
import {useState, useEffect, useContext} from 'react';
import ObjectiveItem from "./Objectives/ObjectiveItem";
import ObjectiveAdder from "./Objectives/ObjectiveAdder";

export default function GoalPage({goal,setViewingGoal}){
    const token = useContext(TokenContext);
    const [addingObjective, setAddingObjective] = useState(false)
    const [goalData,setGoalData] = useState({})
    const [goalComp, setGoalComp] = useState({})

    useEffect(()=>{GetGoalData()},[addingObjective])

    async function GetGoalData(){
        try{
            const response = await fetch('http://localhost:3001/goals/get',{
                method: "post",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({goal_id: goal._id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                setGoalData(bod.goal);
                CompareGoal();
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    async function CompareGoal(){
        try{
            const response = await fetch('http://localhost:3001/goals/cmp',{
                method: "post",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({goal_id: goal._id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                setGoalComp(bod.difference)
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }
    
    

    

    return (
    <div className="flex flex-col">
        <h1 className="text-center text-white font-semibold">{goal.name}</h1>
        {goalData.objectives ? goalData.objectives.map((item,index)=>{
            
            return <ObjectiveItem key={index+"llcoolObj"} objective={item} goal_id={goal._id} GetGoalData={GetGoalData} cmp={goalComp ? goalComp[index]: [0,0]}></ObjectiveItem>
        }): <></>}
        <button className="place-self-center button button-e-blue" onClick={()=>{setAddingObjective(!addingObjective)}}>Add Objective</button>
        {addingObjective ? <ObjectiveAdder goal_id={goal._id} GetGoalData={GetGoalData}></ObjectiveAdder> : ""}
        <button className="button button-e-red" onClick={()=>{setViewingGoal(false)}}>Return</button>
    </div>)

}