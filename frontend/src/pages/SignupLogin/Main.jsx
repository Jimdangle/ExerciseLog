
import Login from './Login/Login'
import Signup from './Signup/Signup'
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 
export default function LSMain({inputs}){
    const [isUser, setIsUser] = useState(true)
    
    
    return (
        <div>
            {!isUser 
                ?
                <Signup></Signup>
                :
                <Login></Login>
            }
            <button className='button button-e-blue' onClick={()=>setIsUser(!isUser)}>{isUser? "Create Account" : "Login"}</button>
        </div>
        
        
    )
}