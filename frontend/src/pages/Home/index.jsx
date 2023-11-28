import JumpIn from "./JumpIn/JumpIn";
import MakeWorkout from "./MakeWorkout/MakeWorkout";
import { useRequest } from "../../hooks/requests/useRequest";
import { useEffect } from "react";
import { logStore, goalStore } from "../../utility/storage";



/**
 * Home Screen component, renders the MakeWorkout, and JumpIn components
 * @param {{function}} props 
 * @param {function} props.logout - function to perform on logout 
 * @returns 
 */
export default function Home({logout}){
    // Load in our most recent Workout and Goal to our storage if we don't have them
    const {data:workoutData,fetchData:fetchWorkout} = useRequest('/workout/lsm');
    const {data:goalData, fetchData:fetchGoal} = useRequest('/goals/ls')
    //Perform fetches for data
    useEffect(()=>{
        if(!logStore.get() || !goalStore.get()){
            fetchWorkout();
            fetchGoal();
        }
    },[])
    // Set in storage
    useEffect(()=>{
        if(goalData && goalData.found){
            goalStore.set(goalData.found[0]._id)
        }
        if(workoutData && workoutData.all){
            logStore.set(workoutData.all[0]._id)
        }
    },[goalData,workoutData])

    return (
        <div>
        
            <MakeWorkout></MakeWorkout>
            <JumpIn></JumpIn>
        
        </div>)
}