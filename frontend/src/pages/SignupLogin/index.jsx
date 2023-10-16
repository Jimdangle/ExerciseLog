
import Login from './Login/Login'
import Signup from './Signup/Signup'
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 
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