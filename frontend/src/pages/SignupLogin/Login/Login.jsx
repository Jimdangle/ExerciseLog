import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect} from 'react'


export default function Login({login}){
    const [state,setState] = useState({"Email":"","Password": ""})
    
    const [resp,setResp] = useState(null);

    //Validators
    const emailValidation = (value) => {  return (value ? value.indexOf('@')>0 : false);} // check for @ symbol

    const payload = {'email': state.Email, 'pass': state.Password}

    //Form inputs 
    const inputs = {
        "Email":{
            
            type: "email",
            value: state['Email'],
            validation: emailValidation,
            placeholder:"@swaggins.com",
            error: "Enter a valid email"
        },
        "Password":{
           
            type: "password",
            value: state['Password'],
            validation: (v)=>{return (v.length > 0);},
            placeholder:"shire!9@asdas",
            error: "Type in a password"
        },
    }

    //Form action
    async function action(){
        await request('/login/login',setResp,'p',payload);
    }

    // Response hanlding
    useEffect(()=>{
        
        if(resp && !resp.data.message){
            if(resp.data.access_token){
                login(resp.data.access_token)
            }
        }
    },[resp])


    return (
        <div className='flex flex-col justify-center' >
            <p className='bname'>BoatLog</p>
            <CoolForm name="Login" inputs={inputs} setData={setState} action={action} animations={{in_anim: 'slider', but_anim: 'slideb' }}></CoolForm>
        </div>
    )



    
}