import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard"
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
        <ExtendoCard header={<ExerciseHeader name={motion.name} setCount={exercise.sets.length}/>} body={<ExerciseBody/>} footer={<ExerciseFooter type={motion.type}/>}/>
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
function ExerciseBody(){
    return (
        <p>Replace with set display</p>
    )
}

function ExerciseFooter({type}){
    
    return (type===0 ? <FaDumbbell/> : <FaClock/>)
}