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
            <div className="flex justify-between">
                <NumberInput styles="w-8" name="rep_or_time" value={newSet.rep_or_time} onChange={onChange}/>
                <NumberInput styles="w-8" name="weight" value={newSet.weight} onChange={onChange}/>
            </div>
            <button onClick={()=>{addFetch(newSet)}}>Add</button>
        
        </div>
    )


    


}