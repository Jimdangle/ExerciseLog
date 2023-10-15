import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect, useCallback} from 'react'
import useFetch from '../../../hooks/requests/useFetch';

//Contain Calls to handle the rendering of components that can make up the 



export default function Signup(){
    const [state, setState ] = useState({Email:'',Username:'', Password:'', Confirm: ''});
    const [response,setResponse] = useState(null)



    //Validators
    const emailValidation = (e) => { const t = e.target; return (t.value.indexOf('@')>0);}
    const passValidation = (e) => {const t= e.target; return (t.value.length > 9)}
    const passConfirmation = (e) => {const t=e.target; return (t.value === state['Password'])}
    
    const payload = {"email":state.Email, "user":state.Username, "pass":state.pass};


    async function handleSignin(){
        console.log(payload)
       await request('/login/signup', setResponse, 'p', payload);
    }
    
    useEffect(()=>{
        console.log(response)
    },[response])

    // Define our form inputs for CoolForms
    const inputs = [
        {
            name: "Email", 
            type: "email",
            value: state['Email'],
            validation: emailValidation,
            placeholder:"bilbo@swaggins.com"
         },
         {
            name: "Username", 
            type: "text",
            value: state['Username'],
            validation: (e)=>{return true},
            placeholder:"Bilbo"
         },
        {
            name: "Password", 
            type: "password",
            value: state['Password'],
            validation: passValidation,
            placeholder:"shire!9@asdas"
         },
        {
            name: "Confirm", 
            type: "password",
            value: state['Confirm'],
            validation: passConfirmation,
            placeholder:"One More Time"
         },
    ]
    
    // Form state change event
    function handleChange(event){
        
        const t = event.target;
        setState({
            ...state,
            [t.name]: t.value
        })
    }

    
    
    return(
        <div className='flex flex-col justify-center' >
            <p className='bname'>BoatLog</p>
            <CoolForm name="Signup" inputs={inputs} setData={handleChange} action={handleSignin} ></CoolForm>
        </div>
    )
}