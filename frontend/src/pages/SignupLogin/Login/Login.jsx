import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect} from 'react'
import { useRequest } from '../../../hooks/requests/useRequest';
/**
 * Login Screen 
 * @param {{function}} props 
 * @param {function} props.login - function to log us into the application  
 * @returns 
 */
export default function Login({login}){
    const [state,setState] = useState({"Email":"","Password": ""})
    
    const [resp,setResp] = useState(null);

    //Validators
    const emailValidation = (value) => {  return (value ? value.indexOf('@')>0 : false);} // check for @ symbol

    const payload = {'email': state.Email, 'pass': state.Password}

    const {data,error,fetchData} = useRequest('/login/login','p',payload)

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
        await fetchData()
    }

    // Response hanlding
    useEffect(()=>{
        console.log(data)
        if(data && data.access_token){
                login(data.access_token)
        }
        else if(error){
            console.log(error)
        }
    },[data,error])


    return (
        <div className='flex flex-col justify-center' >
            <p className='bname'>BoatLog</p>
            <CoolForm name="Login" inputs={inputs} setData={setState} action={action} animations={{in_anim: 'slider', but_anim: 'slideb' }}></CoolForm>
        </div>
    )



    
}