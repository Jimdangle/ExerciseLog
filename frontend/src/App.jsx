import LSMain from "./pages/SignupLogin/Main"
import { setToken, getToken } from "./utility/storage"
import { useState} from 'react'



function App() {
  
  const [userToken, setUserToken] = useState(getToken())

  function logout(){
    setToken("")
    setUserToken("")
  }

  function login(token){
    setUserToken(token)
    setToken(token)
    console.log(token)
  }
  
  return (
    
    <div className="app">
      {userToken === "" ? <LSMain login={login}></LSMain> : <p className="text-white" onClick={()=>{logout();}}>Home</p> }
      
    </div>
    
  ) 
}

export default App
