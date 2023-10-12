
import Signup from './Signup/Signup'
import {useState, useEffect} from 'react'
//Contain Calls to handle the rendering of components that can make up the 
export default function LSMain({inputs}){
    const [isUser, setIsUser] = useState(true)
    
    
    return (
        isUser ?
            <Signup></Signup>
            :
            <></>
        
    )
}