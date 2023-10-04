import { TokenContext } from "../../../views/Home";
import {useContext, useState} from 'react'
import Totals from "./Totals";
import ObjectiveItem from "./ObjectiveItem";
export default function ObjectiveAdder({goal_id}){
    
    const [context,setContext] = useState(0)
    const [target, setTarget] = useState({})
    const [value, setValue] = useState(0)

    function RenderTargetPicker(){
        switch(context){
            case 0: 
                return <Totals setTarget={setTarget}></Totals>
        }
    }
    
    return(
        <div className="bg-slate-600 flex flex-col">
        <div className="flex flex-row"><p>Select Context: </p>
            <select name="context_select" className="w-24 bg-slate-600" onChange={(e)=>{setContext(Number(e.target.value))}}>
                <option value="0">Totals</option>
                <option value="1">Volumes</option>
                <option value="2">Muscles</option>
                <option value="3">Exercises</option>
            </select>   
        </div>
        
        {RenderTargetPicker()}
        

        <div className="flex flex-row">
            <p>Value:</p>
            <input type="number" min="0" onChange={(e)=>{setValue(e.target.value)}}></input>
        </div>
        

        <ObjectiveItem objective={{context:context, target:target, value:value}}></ObjectiveItem>

        </div>)
    }