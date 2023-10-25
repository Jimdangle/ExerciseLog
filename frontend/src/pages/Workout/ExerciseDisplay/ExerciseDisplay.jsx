import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard"
import SetDisplay from "./SetDisplay";
import { useRequest } from "../../../hooks/requests/useRequest";
/* Display all exercises */
import { FaDumbbell, FaClock } from "react-icons/fa6";
export default function ExerciseDisplay({exercises}){


    return( 
        exercises.map((item)=> {
            return <ExerciseItem key={item._id} exercise={item}></ExerciseItem>
        })
    )
}

/* Display a single exercise item
    - need to make body(display current set information, and add new set ability), and footer(icon for type of workout or other info)
*/
function ExerciseItem({exercise}){
    const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion;

    return(
        <ExtendoCard styles={"bg-white text-gun shadow-lg rounded-sm my-2 mx-2"} header={<ExerciseHeader name={motion.name} setCount={exercise.sets.length}/>} body={<ExerciseBody exercise={exercise}/>} footer={<ExerciseFooter type={motion.type}/>}/>
    )
}

/* 
    a header(exercise name, set count),
 */
function ExerciseHeader({name,setCount}){
    return (
        <div className="flex justify-between p-2">
            <p>{name}</p>
            <p className="ml-auto">Sets: {setCount}</p>
        </div>
    )
}

/* This should be a seperate component later called Set Display or something */
function ExerciseBody({exercise}){
    
    return (
        <SetDisplay exercise={exercise}/>
    )
}

function ExerciseFooter({type}){
    
    return (type===0 ? <FaDumbbell/> : <FaClock/>)
}