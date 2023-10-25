import {useState, useEffect, useContext} from 'react'
import CoolForm from '../../../components/forms/CoolForm';
import { request } from '../../../utility/request';
import { setLog } from '../../../utility/storage';
import { PageContext } from '../../PageSelector';
import { useRequest } from '../../../hooks/requests/useRequest';
export default function MakeWorkout(){
    const setPage = useContext(PageContext)
    const [state,setState] = useState({'New Workout': ''}) // user readable state corresponds to inputs
    const payload = {name:state['New Workout']}; // actual payload for request
    const [response,setResponse] = useState(null); // response data object

    const {data,isLoading,error,fetchData} = useRequest('/workout/add','p',payload)

    // Action for the form
    async function HandleNewWorkout(){
        await fetchData();
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
       
        if(data && data.created){
            setPage(1) // set our page
            setLog(data.workout_id)
        }
    }, [data]) // this is only called when the response object has been changed 

    


    return (
    <div>
        <CoolForm name="Workout" inputs={inputs} setData={setState} action={HandleNewWorkout} animations={{in_anim: 'slider', but_anim: 'slideb' }}></CoolForm>
    </div>)


}