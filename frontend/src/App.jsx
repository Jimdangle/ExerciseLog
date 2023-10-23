import LSMain from "./pages/SignupLogin/index"
import Home from "./pages/Home/index"
import NavControl from "./pages/Nav"
import { setToken, getToken,setLog, setPage } from "./utility/storage"
import { useState} from 'react'
import PageSelector from "./pages/PageSelector"

/* Some things I want over my last build would be maybe a seperate page to add in workouts so it can be 
more customized, also considering making the muscles array into just a mixed obj with certain valid keys we could send over
so like store things only for the muscles they have instead of alloc a 7 size arr, and we can expand how we want */

function App() {
  
  const [userToken, setUserToken] = useState(getToken())

  function logout(){
    setToken("")
    setUserToken("")
    setLog("")
    setPage(0)
  }

  function login(token){
    setUserToken(token)
    setToken(token)
    console.log(token)
  }
  
  return (
    
    <div className="app w-screen h-screen bg-gun">
      {userToken === "" ? <LSMain login={login}></LSMain> : <PageSelector logout={logout}></PageSelector>
      }
      
    </div>
    
  ) 
}

export default App
