import { TokenContext } from "../../../views/Home";
import {useContext, useState} from 'react'
import Totals from "./Totals";
import ObjectiveItem from "./ObjectiveItem";
import Volumes from "./Volumes";
import Muscles from "./Muscles";
import Exercise from "./Exercises";
export default function ObjectiveAdder({goal_id,GetGoalData}){
    
    const token = useContext(TokenContext)

    const [context,setContext] = useState(0)
    const [target, setTarget] = useState({})
    const [value, setValue] = useState(0)

    function RenderTargetPicker(){
        switch(context){
            case 0: 
                return <Totals setTarget={setTarget}></Totals>
            case 1:
                return <Volumes setTarget={setTarget}></Volumes>
            case 2:
                return <Muscles setTarget={setTarget}></Muscles>
            case 3:
                return <Exercise setTarget={setTarget}></Exercise>
        }
    }

    async function AddObjective(){
        try{
            const response = await fetch('http://localhost:3001/goals/addObj',{
                method: "POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({context:context,target:target,value:value,goal_id:goal_id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                GetGoalData()
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }
    
    return(
        <div className="bg-slate-600 flex flex-col p-3">
            <div className="flex flex-row text-white"><p>Context: </p>
                {/**Select context, once it is changed reset our target to be null so we dont keep an old target */}
                <select name="context_select" className="bg-slate-600" onChange={(e)=>{setContext(Number(e.target.value)); setTarget({})}}>
                    <option value="0">Totals</option>
                    <option value="1">Volumes</option>
                    <option value="2">Muscles</option>
                    <option value="3">Exercises</option>
                </select>   
            </div>
            
            {RenderTargetPicker()}
            

            <div className="flex flex-row">
                <p className="text-white">Target Value:</p>
                <input className="focus:text-center w-12 rounded-md" type="number" min="0" onChange={(e)=>{setValue(e.target.value)}}></input>
            </div>
            


            <div className="flex justify-center">
                <button className="button button-e-blue" onClick={AddObjective}>Add!</button>
            </div>

        </div>)
    }