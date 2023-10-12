import { request } from '../../../utility/request';
import CoolForm from '../../../components/forms/CoolForm';
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 

const emailValidation = (e) => { const t = e.target; return (t.value.indexOf('@')>0);}
const passValidation = (e) => {const t= e.target; return (t.value.length > 9)}


export default function Signup(){
    const [state, setState ] = useState({Email:'',Username:'', Password:'', Confirm: ''});
    const [resp,setResp] = useState(null)
    const [payload,setPayload] = useState({email:'',user:'', pass:''})

    // Update the real data we plan on sending to the server
    useEffect(()=>{
        setPayload({email:state.Email, pass:state.Confirm})
    },[state])


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
            validation: passValidation,
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

    // Response hanlding
    useEffect(()=>{
        console.log(resp)
    },[resp])

    async function HandleSignin(){
        await request('/login/signup',setResp,'p',payload);
    }

    
    return(
        <div className='flex flex-col justify-center' >
            <CoolForm name="Signup" inputs={inputs} setData={handleChange} action={HandleSignin}></CoolForm>
        </div>
    )
}