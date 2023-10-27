
import Login from './Login/Login'
import Signup from './Signup/Signup'
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 

/**
 * Controlling component for Login and Signin Screens, determine which one to display depending on what the user wants to do
 * @param {{function}} props 
 * @param {function} props.login - function to log a user in 
 * 
 */
export default function LSMain({login}){
    const [isUser, setIsUser] = useState(true)
    
    
    return (
        <div>
            {!isUser 
                ?
                <Signup login={login}></Signup>
                :
                <Login login={login}></Login>
            }
            <p className='text-white' onClick={()=>setIsUser(!isUser)}>{isUser? "Don't have an account?" : "Login to existing account"}</p>
        </div>
        
        
    )
}