import { useState } from 'react'

import LoginSignup from '../views/LoginSignup'
import Home from '../views/Home'
import lsPrefix from '../config/cfUtil'
import LogList from './LogList/LogList'
function App() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleSignedIn = () =>{
    var is = isSignedIn;
    setIsSignedIn(!is);
  }

  
  return (
    
    <div className="grid md:mobile_grid lg:desktop_grid">
      <div className="max-md:col-span-1 lg:col-span-1"></div>
      {localStorage.getItem(lsPrefix+"actk") ? <Home signout={toggleSignedIn}></Home> : <LoginSignup signin={toggleSignedIn}></LoginSignup>}
      <div className="max-md:col-span-1 lg:col-span-1"></div>
    </div>
    
  ) 
}

export default App
