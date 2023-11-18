import LiftAdder from "./LiftAdder";
import CardioAdder from "./CardioAdder";
export default function SetAdder({type, addSet, last}){
    
    return (
    <div>
        {type === 0 ?
            <LiftAdder addFetch={addSet} last={last}/>   
            :
            <CardioAdder addFetch={addSet} last={last}/> 
        }
    </div>)
}