import { useState } from 'react'

import LoginSignup from '../views/LoginSignup'
import Home from '../views/Home'
import lsPrefix from '../config/cfUtil'
import LogList from './LogList/LogList'
import LogView from '../views/LogView'
import ExerciseAdder from './ExerciseAdder/ExerciseAdder'
function App() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  

  const toggleSignedIn = () =>{
    var is = isSignedIn;
    setIsSignedIn(!is);
  }

  
  
  return (
    
    <div className="bg-slate-800 h-full w-full">
      
      {localStorage.getItem(lsPrefix+"actk") ? <Home signout={toggleSignedIn}></Home> : <LoginSignup signin={toggleSignedIn}></LoginSignup>}
      
    </div>
    
  ) 
}

export default App
