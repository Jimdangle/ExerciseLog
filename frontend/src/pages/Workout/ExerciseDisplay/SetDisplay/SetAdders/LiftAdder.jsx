import NumberInput from "../../../../../components/forms/inputs/NumberInput"
import IncrementalInput from "../../../../../components/forms/inputs/IncrementalInput"
import { useState } from "react"
export default function({addFetch,last}){
    const lastRep = last && last.rep_or_time ? last.rep_or_time : 1
    const lastWeight = last && last.added_weight ? last.added_weight : 1
    console.log(`${lastRep}, ${lastWeight}`)
    const [newSet,setNewSet] = useState({rep_or_time: lastRep ,weight: lastWeight})
    const onChange = (event) => {
        setNewSet({
            ...newSet,
            [event.target.name]: event.target.value
        })
    }

    

    
    return(
        <div>
            <div className="flex flex-col">
                <IncrementalInput name="rep_or_time" value={newSet.rep_or_time} onChange={onChange} step={1} min={1} max={50} label="Reps"/>
                {/**<NumberInput styles="w-8" name="rep_or_time" value={newSet.rep_or_time} onChange={onChange}/> */}
                <IncrementalInput name="weight" value={newSet.weight} onChange={onChange} step={5} min={0} max={1000} label="Weight"/>
            </div>
            <div className="flex justify-center">
                <button className="button button-e-blue" onClick={()=>{addFetch(newSet)}}>Add</button>
            </div>
            
        
        </div>
    )


    


}