import { useState } from 'react'

import LoginSignup from '../views/LoginSignup'
import Home from '../views/Home'
import lsPrefix from '../config/cfUtil'
function App() {
  
  

  return (
    <>
      {localStorage.getItem(lsPrefix+"actk") ? <Home></Home> : <LoginSignup></LoginSignup>}
     
    </>
  )
}

export default App
