import {useState, useEffect, useContext} from 'react'
import CoolForm from '../../../components/forms/CoolForm';
import { request } from '../../../utility/request';
import { setLog } from '../../../utility/storage';
import { PageContext } from '../../PageSelector';
export default function MakeWorkout(){
    const setPage = useContext(PageContext)
    const [state,setState] = useState({'New Workout': ''}) // user readable state corresponds to inputs
    const payload = {name:state['New Workout']}; // actual payload for request
    const [response,setResponse] = useState(null); // response data object

    // Action for the form
    async function HandleNewWorkout(){
        await request('/workout/add', setResponse,'p',payload);
    }

    // input for the form
    const inputs = {
        "New Workout" : {
            type: "text",
            value: state['New Workout'],
            validation: (v)=>{return true;},
            error: "",
        }
    }
    
    // handle the response
    useEffect(()=> {
       
        if(response && response.data && response.data.created){
            setPage(1) // set our page
            setLog(response.data.id)
        }
    }, [response]) // this is only called when the response object has been changed 




    return (
    <div>
        <CoolForm name="Workout" inputs={inputs} setData={setState} action={HandleNewWorkout}></CoolForm>
    </div>)


}