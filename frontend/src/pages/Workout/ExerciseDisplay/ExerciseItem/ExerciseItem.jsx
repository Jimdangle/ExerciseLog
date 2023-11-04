import ExtendoCard from "../../../../components/cards/ExtendoCard/ExtendoCard";
import SetDisplay from "../SetDisplay/SetDisplay";
import { useRequest } from "../../../../hooks/requests/useRequest";
import { FaDumbbell, FaClock,FaTrash} from "react-icons/fa6";

export default function ExerciseItem({exercise, deleteExercise}){
    const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion;

    const deleteSelf = () => {
        deleteExercise(exercise._id);
    }
    

    return(
        <ExtendoCard styles={"bg-white text-gun shadow-lg rounded-sm my-2 mx-2"} header={<ExerciseHeader name={motion.name} setCount={exercise.sets.length}/>} body={<SetDisplay exercise={exercise} type={motion.type}/>} footer={<ExerciseFooter type={motion.type} deleteExercise={deleteSelf}/>}/>
    )
}

/** 
    a header(exercise name, set count),
 */
function ExerciseHeader({name,setCount}){
    return (
        <div className="flex justify-between p-2">
            <p>{name}</p>
           
        </div>
    )
}



/**
 * In House footer component for our card
 * @param {number} type - Number from [0,1,2] : Lift, Cardio, Hold
 */
function ExerciseFooter({type, deleteExercise}){
    
    return (
        <div>
            {type===0 ? <FaDumbbell/> : <FaClock/>}
            <FaTrash onClick={deleteExercise}/>
        </div>
        )
}