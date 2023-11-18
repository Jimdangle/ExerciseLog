import DropInput from "../../../../components/forms/inputs/DropInput"
import { useEffect } from "react";
export default function VolumeObjectives({setSpec}){
    useEffect(()=>{
        setSpec(['exercise_totals', '0']); // using this to set a default value in spec for when this option is selected (otherwise the user has to click a seperate option and reclick this one)
    },[])

    const inputs = [
        {name:"Lifts", value:'0'},
        {name:"Cardio", value:'1'},
        {name:"Holds", value:'2'},
    ]

    const onChange = (event) => {setSpec(['exercise_totals',event.target.value])}

    return(
        <div>
            <DropInput name="Totals" items={inputs} onChange={onChange} label="Choose a target" styles="input-dd-gun"/>
        </div>
    )
}