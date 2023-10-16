import {useState} from 'react'
import CoolForm from '../../../components/forms/CoolForm';
import { request } from '../../../utility/request';

export default function MakeWorkout(){
    
    const [state,setState] = useState({'New Workout': ''})
    const payload = {name:state['New Workout']};
    const [response,setResponse] = useState(null);

    async function HandleNewWorkout(){
        await request('/workout/add', setResponse,'p',payload);
    }

    const inputs = {
        "New Workout" : {
            type: "text",
            value: state['New Workout'],
            validation: (v)=>{return true;},
            error: "",
        }
    }

    return (
    <div>
        <CoolForm name="Workout" inputs={inputs} setData={setState} action={HandleNewWorkout}></CoolForm>
    </div>)


}