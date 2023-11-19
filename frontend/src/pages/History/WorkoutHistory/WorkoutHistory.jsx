import { useEffect } from "react";
import EditableList from "../../../components/lists/EditableList/EditableList";
import { useRequest } from "../../../hooks/requests/useRequest";
import WorkoutCard from "./WorkoutCard";
/**
 * Display a list of workouts for the user (im thinking more toggle able cards)
 * Then we pull a summary for the workout and place the muscle overlay in the toggleable portion
 * 
 * @param {*} param0 
 */
export default function WorkoutHistory({}){
    const {data:workouts,fetchData:getWorkouts} = useRequest('/workout/lsm');

    const {data:remData,fetchData:removeWorkout} = useRequest('/workout/delete', 'x')

    useEffect(()=>{
        getWorkouts();
    },[])

    useEffect(()=>{
        if(workouts){
            console.log(workouts)
        }
    },[workouts])

    async function removeAction(object) {
        await removeWorkout({workout_id:object._id});
        await getWorkouts();
    }


    return(
        <div className="mt-2">
            <div className="flex justify-center">
                <p className="text-center text-lg font-semibold">Workout History</p>
            </div>
            {workouts && workouts.all ? 
                <EditableList title="Workout History" list={workouts.all} removeAction={removeAction} componentType={WorkoutCard} tColor='text-white'/>
                :
                <></>
            }
        </div>
    )

}