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
        <>
        { !exercise ?
            <></>
            :
            <ExtendoCard styles={"bg-white text-gun shadow-lg rounded-sm my-2 mx-2"} header={<ExerciseHeader name={motion.name} type={motion.type}/>} body={<SetDisplay exercise={exercise} type={motion.type}/>} footer={<ExerciseFooter type={motion.type} deleteExercise={deleteSelf}/>}/>
        }
        </>
        
    )
}

/** 
    a header(exercise name, set count),
 */
function ExerciseHeader({name,type}){
    return (
        <div className="flex w-[80%] rounded-b-md rounded-r-md shadow-md border-r-2 border-b-2 bg-oblue text-white border-gun p-2 justify-between">
            <p className="text-lg font-semibold">{name} </p>
            <p className=""> {type===0 ? <FaDumbbell /> : <FaClock/>} </p>
        </div>
    )
}



/**
 * In House footer component for our card
 * @param {number} type - Number from [0,1,2] : Lift, Cardio, Hold
 */
function ExerciseFooter({type, deleteExercise}){
    
    return (
        <div className="h-12 w-full mb-1 flex justify-between">
            <div>
               
            </div>
            <div>
                <FaTrash className="mt-6 text-xl mr-2" onClick={deleteExercise}/>
            </div>
            
        </div>
        )
}