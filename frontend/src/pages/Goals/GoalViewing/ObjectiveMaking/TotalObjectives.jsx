import DropInput from "../../../../components/forms/inputs/DropInput"
export default function TotalObjectives({setSpec}){
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