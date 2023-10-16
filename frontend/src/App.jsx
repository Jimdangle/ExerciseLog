import LSMain from "./pages/SignupLogin/index"
import Home from "./pages/Home/index"
import { setToken, getToken } from "./utility/storage"
import { useState} from 'react'

/* Some things I want over my last build would be maybe a seperate page to add in workouts so it can be 
more customized, also considering making the muscles array into just a mixed obj with certain valid keys we could send over
so like store things only for the muscles they have instead of alloc a 7 size arr, and we can expand how we want */

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
      {userToken === "" ? <LSMain login={login}></LSMain> : <Home logout={logout}></Home> }
      
    </div>
    
  ) 
}

export default App
