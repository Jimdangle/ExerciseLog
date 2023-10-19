import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect, useCallback} from 'react'


//Contain Calls to handle the rendering of components that can make up the 



export default function Signup({login}){
    const [state, setState ] = useState({Email:'',Username:'', Password:'', Confirm: ''});
    const [response,setResponse] = useState(null)



    //Validators
    const emailValidation = (value) => { return (value.indexOf('@')>0);}
    const passValidation = (value) => { return (value.length > 9)}
    const passConfirmation = (value) => { return (value === state['Password'])}
    
    const payload = {"email":state.Email, "user":state.Username, "pass":state.Password};

    async function handleSignin(){
        console.log(payload)
       await request('/login/signup', setResponse, 'p', payload);
    }
    
    // Define our form inputs for CoolForms
    const inputs = {
        "Email": {
            type: "email",
            value: state['Email'],
            validation: emailValidation,
            error: "Please us a valid email",
            placeholder:"bilbo@swaggins.com"
         },
        'Username':{
            type: "text",
            value: state['Username'],
            validation: (v)=>{return true},
            error: "",
            placeholder:"Bilbo"
         },
        'Password':{
            type: "password",
            value: state['Password'],
            validation: passValidation,
            error: "Make sure your password is more than 9 characters",
            placeholder:"shire!9@asdas"
         },
        'Confirm':{
            type: "password",
            value: state['Confirm'],
            validation: passConfirmation,
            error: "Make sure both passwords match",
            placeholder:"One More Time"
         },
    }
    
    //Response handler
    useEffect(()=>{
        if(response && !response.data.message ){
            if(response.data.access_token){
                login(response.data.access_token)
            }
        }
    },[response])

    
    return(
        <div className='flex flex-col justify-center' >
            <p className='bname'>BoatLog</p>
            <CoolForm name="Signup" inputs={inputs} setData={setState} action={handleSignin} animations={{in_anim: 'slider', but_anim: 'slideb' }} ></CoolForm>
        </div>
    )
}