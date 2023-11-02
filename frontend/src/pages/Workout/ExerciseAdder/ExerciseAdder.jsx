import TextInput from "../../../components/forms/inputs/TextInput";
import DropInput from "../../../components/forms/inputs/DropInput";
import SliderInput from "../../../components/forms/inputs/SliderInput";

import {useState} from 'react'
export default function ExerciseAdder({}){
    const [state,setState] = useState({name:'',type:0,muscles:{},desc:''});

    // update the normal easy values
    const onChange = (event) => {setState({...state,[event.target.name]:event.target.value})}
    const setMuscles = (event) => { // Update our muscle values
        setState((old)=> {
            return {...old, muscles:{...muscles,[event.target.name]:event.target.value}}
        })
    }

    const dropDownOptions = [
        {name: "Lift", value: 0},
        {name: "Cardio", value: 1},
        {name: "Hold", value: 2}
    ]

    return(
        <div>
            <TextInput name="name" styles="text-gun" value={state.name} onChange={onChange}/>
            <DropInput name="type" styles="text-gun" value={state.type} onChange={onChange} items={dropDownOptions}/>

        </div>
    )

}