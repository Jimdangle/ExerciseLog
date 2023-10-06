import { TranslateType } from "../../../utils/goalutil"
import { TokenContext } from "../../../views/Home";
import { useContext } from "react";
export default function ObjectiveItem({objective, goal_id, GetGoalData, cmp}){
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
    <div>
        <p><span className="text-green-400 font">{TranslateType(objective.context)}</span> --{objective.target ? Object.keys(objective.target).map((item,index)=>{return <span key={index+"l"+index} className="text-white"> {item}: {objective.target[item] },</span>}) : <></>}-- <span className="text-red-400">{objective.value}</span> v.s <span className="text-green-400 font">{cmp ? cmp[1]: cmp}</span></p>
        <p className="text-red-400 font-semibold hover:text-white" onClick={RemoveObjective}>Remove</p>
        
    </div>)
}