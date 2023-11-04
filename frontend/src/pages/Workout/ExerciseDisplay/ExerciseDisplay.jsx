import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard"
import SetDisplay from "./SetDisplay/SetDisplay"
import { useRequest } from "../../../hooks/requests/useRequest";
import { getLog } from "../../../utility/storage";
import ExerciseItem from "./ExerciseItem/ExerciseItem";
/**
 * Display an exercise, display info about the exercise and it's sets
 * @param {{Object}} props - Main props component 
 * @param {Object} props.exercise - exercise to display
 */
export default function ExerciseDisplay({exercises, refresh}){

    const log = getLog();
    const {data,isLoading,error,fetchData} = useRequest('/workout/remEx', 'x', {workout_id:log})

    const deleteExercise = async (exercise_id) => {
        await fetchData({exercise_id:exercise_id});
        await refresh();
    }
    return( 
        exercises.map((item)=> {
            return <ExerciseItem key={item._id} exercise={item} deleteExercise={deleteExercise}></ExerciseItem>
        })
    )
}
