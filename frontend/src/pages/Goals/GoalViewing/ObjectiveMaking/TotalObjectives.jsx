import DropInput from "../../../../components/forms/inputs/DropInput"
import { useEffect } from "react"
export default function TotalObjectives({setSpec}){
    useEffect(()=>{
        setSpec(['total_workouts']); // using this to set a default value in spec for when this option is selected (otherwise the user has to click a seperate option and reclick this one)
    },[])

    const inputs = [
        {name:"Total Workouts", value:'total_workouts'},
        {name:"Total Exercises", value:'total_exercises'},
        {name:"Total Sets", value:'total_sets'},
    ]

    const onChange = (event) => {setSpec([event.target.value])}

    return(
        <div>
            <DropInput name="Totals" items={inputs} onChange={onChange} label="Choose a target" styles="input-dd-gun"/>
        </div>
    )
}