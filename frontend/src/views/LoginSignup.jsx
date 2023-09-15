import { useState } from 'react'

import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import lsPrefix from '../config/cfUtil';

export default function LoginSignup() {
  const [isUser, setIsUser] = useState(false);

  const toggleUser = () => {
    var isU = isUser;
    setIsUser(!isU);
  }
  

  return (
    <>

      <p>{localStorage.getItem(lsPrefix+"actk") ?  "Logged in!" : "Not Logged in"}</p>
      
      <button disabled={false} onClick={()=>{toggleUser()}} className='my-2 absolute top-3/4 left-1/2 -translate-x-1/2 translate-y-10 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400'>{isUser ? "Don't Have an Account?" : "Have An Account?"}</button>
      
      {isUser ? <Login></Login> : <Signup></Signup>}
      
    </>
  )
}