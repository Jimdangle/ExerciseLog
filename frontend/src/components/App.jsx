import { useState } from 'react'

import LoginSignup from '../views/LoginSignup'
import Home from '../views/Home'
import lsPrefix from '../config/cfUtil'
function App() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleSignedIn = () =>{
    var is = isSignedIn;
    setIsSignedIn(!is);
  }

  return (
    <>
      {localStorage.getItem(lsPrefix+"actk") ? <Home signout={toggleSignedIn}></Home> : <LoginSignup signin={toggleSignedIn}></LoginSignup>}
      
    </>
  )
}

export default App
