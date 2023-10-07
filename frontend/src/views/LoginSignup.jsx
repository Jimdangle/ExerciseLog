import { useState } from 'react'

import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import lsPrefix from '../config/cfUtil';

export default function LoginSignup({signin}) {
  const [isUser, setIsUser] = useState(true);

  const toggleUser = () => {
    var isU = isUser;
    setIsUser(!isU);
  }
  

  return (
    
    <div>
      {/**spacer */}
      <div className='h-124'><p className='text-slate-800'>t</p></div>
      {isUser ? <Login signin={signin}></Login> : <Signup onClick={toggleUser}></Signup>}
      
      <div className='flex justify-center'>
        <button disabled={false} onClick={()=>{toggleUser()}} className=' button button-a-blue'>{isUser ? "Don't Have an Account?" : "Have An Account?"}</button>
      </div>
      {/**Literal filler, large height, large vertical margin, invisible text */}
      <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
    </div>
    
  )
}