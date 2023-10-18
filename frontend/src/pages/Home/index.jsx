/* Home Screen will
     need logic for making a new workout
     recent goal screen 
     Jump Back In button
     It would be cool to know if its a user's first time opening the app to give them tips on how to use it
*/
import JumpIn from "./JumpIn/JumpIn";
import MakeWorkout from "./MakeWorkout/MakeWorkout";
import {createContext} from 'react'

export const LogoutContext = createContext(null);
export default function Home({logout}){


    return (
        <LogoutContext.Provider value={logout}>
            <MakeWorkout></MakeWorkout>
            <JumpIn></JumpIn>
            <p className="text-white" onClick={()=>{logout()}}>Click to Logout</p>
        </LogoutContext.Provider>)
}