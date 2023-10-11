import { TokenContext } from "../../views/Home";
import {useState, useEffect, useContext} from 'react';
import ObjectiveItem from "./Objectives/ObjectiveItem";
import ObjectiveAdder from "./Objectives/ObjectiveAdder";

export default function GoalPage({goal,setPage}){
    const token = useContext(TokenContext);
    const [addingObjective, setAddingObjective] = useState(false)
    const [goalData,setGoalData] = useState({})
    const [goalComp, setGoalComp] = useState(null)
    const [translated,setTranslated] = useState([])

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
                
                setGoalData(bod.goal);
                setTranslated(bod.translated)
                
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
                
                setGoalComp(bod.difference)
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }
    
    

    

    return (
    <div className="flex flex-col justify-center">
        <h1 className="text-center h1-white">{goal.name}</h1>
        {goalData && goalData.objectives && goalComp ? goalData.objectives.map((item,index)=>{
            
            return <ObjectiveItem key={index+"llcoolObj"} objective={item} translated={translated[index]} goal_id={goal._id} GetGoalData={GetGoalData} cmp={goalComp ? goalComp[index]: [0,0]}></ObjectiveItem>
        }): <p className="info-red">Could not Load Objectives or Goal Completion</p>}
        <button className="place-self-center button button-e-blue" onClick={()=>{setAddingObjective(!addingObjective)}}>Add Objective</button>
        {addingObjective ? <ObjectiveAdder goal_id={goal._id} GetGoalData={GetGoalData}></ObjectiveAdder> : ""}
        {/**Literal filler, large height, large vertical margin, invisible text */}
        <div className='h-124 mt-64 w-96'><p className='text-gun'>t</p></div>
        {/* I hate frontend.. Maybe because i just really dont understand it half the time. Adding the w-96 to the filler line has solved my responsive issue where this screen was a)rendering a different size when the add button was clicked, b) rendering extremely small in mobile c) rendering far to the left on larger screens */}
        <button className="button button-e-red w-24 justify-center place-self-center" onClick={()=>{setPage(0)}}>Return</button>
    </div>)

}