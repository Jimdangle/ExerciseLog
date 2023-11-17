import DropInput from "../../../../components/forms/inputs/DropInput"
export default function VolumeObjectives({setSpec}){
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