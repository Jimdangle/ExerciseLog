import { TokenContext } from "../../views/Home";
import {useState, useEffect, useContext} from 'react';
import ObjectiveItem from "./Objectives/ObjectiveItem";
import ObjectiveAdder from "./Objectives/ObjectiveAdder";

export default function GoalPage({goal,setViewingGoal}){
    const token = useContext(TokenContext);
    const [addingObjective, setAddingObjective] = useState(false)
    const [goalData,setGoalData] = useState({})
    const [goalComp, setGoalComp] = useState(null)

    useEffect(()=>{GetGoalData();CompareGoal();},[addingObjective])

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
        <h1 className="text-center h1-white">{goal.name}</h1>
        {goalData.objectives && goalComp ? goalData.objectives.map((item,index)=>{
            console.log(goalComp)
            return <ObjectiveItem key={index+"llcoolObj"} objective={item} goal_id={goal._id} GetGoalData={GetGoalData} cmp={goalComp ? goalComp[index]: [0,0]}></ObjectiveItem>
        }): <p className="info-red">Could not Load Objectives or Goal Completion</p>}
        <button className="place-self-center button button-e-blue" onClick={()=>{setAddingObjective(!addingObjective)}}>Add Objective</button>
        {addingObjective ? <ObjectiveAdder goal_id={goal._id} GetGoalData={GetGoalData}></ObjectiveAdder> : ""}
        {/**Literal filler, large height, large vertical margin, invisible text */}
        <div className='h-124 mt-64'><p className='text-gun'>t</p></div>
        <button className="button button-e-red w-24 justify-center place-self-center" onClick={()=>{setViewingGoal(false)}}>Return</button>
    </div>)

}