import LSMain from "./pages/SignupLogin/Main"
import { setToken } from "./utility/storage"
import { useState} from 'react'



function App() {
  
  const [userToken, setUserToken] = useState("")

  function logout(){
    setUserToken("")
  }

  function login(token){
    setUserToken(token)
    setToken(token)
    console.log(token)
  }
  
  return (
    
    <div className="app">
      {userToken === "" ? <LSMain login={login}></LSMain> : <p>Home</p> }
      
    </div>
    
  ) 
}

export default App
