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
    
    <div className="md:mobile_middle lg:desktop_middle">
      <p>{localStorage.getItem(lsPrefix+"actk") ?  "Logged in!" : "Not Logged in"}</p>
       
      {isUser ? <Login signin={signin}></Login> : <Signup onClick={toggleUser}></Signup>}
      <button disabled={false} onClick={()=>{toggleUser()}} className='justify-center my-2 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400'>{isUser ? "Don't Have an Account?" : "Have An Account?"}</button>
    </div>
    
  )
}