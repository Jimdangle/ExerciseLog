import NumberInput from "../../../../../components/forms/inputs/NumberInput"
import { useState } from "react"
export default function({addFetch}){
    const [newSet,setNewSet] = useState({rep_or_time:0,weight:0})
    const onChange = (event) => {
        setNewSet({
            ...newSet,
            [event.target.name]: event.target.value
        })
    }

    
    return(
        <div>
            <NumberInput name="rep_or_time" value={newSet.rep_or_time} onChange={onChange}/>
            <NumberInput name="weight" value={newSet.weight} onChange={onChange}/>
            <button onClick={()=>{addFetch(newSet)}}>Add</button>
        
        </div>
    )


    


}