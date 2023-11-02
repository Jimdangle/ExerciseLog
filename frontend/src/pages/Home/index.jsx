import JumpIn from "./JumpIn/JumpIn";
import MakeWorkout from "./MakeWorkout/MakeWorkout";
import {createContext} from 'react'


export const LogoutContext = createContext(null);

/**
 * Home Screen component, renders the MakeWorkout, and JumpIn components
 * @param {{function}} props 
 * @param {function} props.logout - function to perform on logout 
 * @returns 
 */
export default function Home({logout}){
    

    return (
        <div>
        <LogoutContext.Provider value={logout}>
            <MakeWorkout></MakeWorkout>
            <JumpIn></JumpIn>
            <p className="text-white" onClick={()=>{logout()}}>Click to Logout</p>
        </LogoutContext.Provider>
        </div>)
}