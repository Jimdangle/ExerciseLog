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

  return(<>
    <LogList list={[{name:"t1",created_at:"1",key:1},{name:"t2",created_at:"2",key:2},{name:"t3",created_at:"3",key:3}]}></LogList>
  </>)

  /* return (
    <>
      {localStorage.getItem(lsPrefix+"actk") ? <Home signout={toggleSignedIn}></Home> : <LoginSignup signin={toggleSignedIn}></LoginSignup>}
      
    </>
  ) */
}

export default App
