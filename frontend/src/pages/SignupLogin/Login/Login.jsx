import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect} from 'react'

export default function Login(){
    const [state,setState] = useState({"Email":"","Password": ""})
    const [payload,  setPayload] = useState({'email':'','pass':''})
    const [resp,setResp] = useState(null);

    //Validators
    const emailValidation = (e) => { const t = e.target; return (t.value.indexOf('@')>0);} // check for @ symbol

    // Update the real data we plan on sending to the server
    useEffect(()=>{
        setPayload({email:state.Email, pass:state.Confirm})
    },[state])


    // Form state change event
    function handleChange(event){
    
        const t = event.target;
        setState({
            ...state,
            [t.name]: t.value
        })
    }

    //Form inputs 
    const inputs = [
        {
            name: "Email", 
            type: "email",
            value: state['Email'],
            validation: emailValidation,
            placeholder:"@swaggins.com"
        },
        {
            name: "Password", 
            type: "password",
            value: state['Password'],
            validation: ()=>{return true;},
            placeholder:"shire!9@asdas"
        },
    ]

    //Form action
    async function action(){
        await request('/login/login',setState,'p',payload);
    }

    // Response hanlding
    useEffect(()=>{
        console.log(resp)
    },[resp])


    return (
        <div className='flex flex-col justify-center' >
            <p className='bname'>BoatLog</p>
            <CoolForm name="Login" inputs={inputs} setData={handleChange} action={action}></CoolForm>
        </div>
    )



    
}