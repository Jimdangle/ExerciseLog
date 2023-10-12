import { request } from '../../utility/request';
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 
export default function Singup({inputs}){
    const [state, setState ] = useState({email:'',pass:''});
    const [resp,setResp] = useState(null)
    
    function handleChange(event){
        const t = event.target;
        setState({
            ...state,
            [t.name]: t.value
        })
    }

    useEffect(()=>{
        console.log(resp)
    },[resp])

    
    
    return(
        <div >
            <input name="email" type="email" onChange={(e)=>{handleChange(e)}} value={state['email']} placeholder='email'></input>
            <input name="pass" type="password" onChange={(e)=>{handleChange(e)}} value={state['pass']} placeholder='pass'></input>
            <button onClick={async()=>{await request('/login/signup', setResp,'p',state)}}>Click</button>

        </div>
    )
}