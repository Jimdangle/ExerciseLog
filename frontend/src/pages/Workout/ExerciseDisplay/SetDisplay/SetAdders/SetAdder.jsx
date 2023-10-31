import LiftAdder from "./LiftAdder";
import CardioAdder from "./CardioAdder";
export default function SetAdder({type, addSet}){
    return (
    <div>
        {type === 0 ?
            <LiftAdder addFetch={addSet}/>   
            :
            <CardioAdder addFetch={addSet}/> 
        }
    </div>)
}