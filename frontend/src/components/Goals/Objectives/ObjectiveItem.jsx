import { TranslateType } from "../../../utils/goalutil"
import { TokenContext } from "../../../views/Home";
import { useContext } from "react";

import { percentageColor } from "../../../utils/styleutil";
export default function ObjectiveItem({objective, goal_id, GetGoalData, cmp, translated}){
    const token = useContext(TokenContext)

    

    async function RemoveObjective(){
        try{
            const response = await fetch('http://localhost:3001/goals/remObj',{
                method: "delete",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({objective_id:objective._id, goal_id: goal_id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                GetGoalData();
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    return (
    <div className="flex flex-col mx-3 py-2 border-b-2 border-dashed border-b-white">
        
        <div className="flex flex-row justify-between">
            <p className="h2-blue">{TranslateType(objective.context)} </p>
            
        </div>
        <p className="h3-green">{translated}</p>
        
        <div className="flex flex-row justify-between"><p className="h3-white">Value: </p>  <p className="str-blue mr-4">{objective.value}</p></div>
        {cmp&&cmp.length>1?<div className="flex flex-row justify-between"><p className="h3-white">Progress: </p> <p className={"font-semibold "+percentageColor(cmp[0]/cmp[1])}>{Math.round((cmp[0]/cmp[1])*100)}% <span className="text-slate-400">({cmp[0]})</span> </p></div>:<></>}
        
        <button className="button button-e-red w-24 place-self-end" onClick={RemoveObjective}>Remove</button>
    </div>)
}