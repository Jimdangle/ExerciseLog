import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard"
import SetDisplay from "./SetDisplay/SetDisplay"
import { useRequest } from "../../../hooks/requests/useRequest";

import ExerciseItem from "./ExerciseItem/ExerciseItem";
/**
 * Display an exercise, display info about the exercise and it's sets
 * @param {{Object}} props - Main props component 
 * @param {Object} props.exercise - exercise to display
 */
export default function ExerciseDisplay({exercises}){


    return( 
        exercises.map((item)=> {
            return <ExerciseItem key={item._id} exercise={item}></ExerciseItem>
        })
    )
}
