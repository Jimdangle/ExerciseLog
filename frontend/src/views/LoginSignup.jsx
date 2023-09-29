import { useState } from 'react'

import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import lsPrefix from '../config/cfUtil';

export default function LoginSignup({signin}) {
  const [isUser, setIsUser] = useState(false);

  const toggleUser = () => {
    var isU = isUser;
    setIsUser(!isU);
  }
  

  return (
    
    <>
      {isUser ? <Login signin={signin}></Login> : <Signup onClick={toggleUser}></Signup>}
      <div className='flex justify-center'>
        <button disabled={false} onClick={()=>{toggleUser()}} className=' button button_e_green'>{isUser ? "Don't Have an Account?" : "Have An Account?"}</button>
      </div>
     
    </>
    
  )
}