import { stdColorRed } from "../../utils/styleutil";
import { TranslateMuscle, TranslateType } from "../../utils/muscle";

export default function ExerciseSummary({name,exercise,contribution}){
    
    
    return (

        <div className="mt-5 flex flex-col">
            <div className="flex border-b-2 mb-2 pb-2 border-dashed border-oblue">
                <h3 className="mt-2 h2-white">{name}</h3>
                <h3 className="ml-1 text-sm justify-self-end text-oblue">{TranslateType(exercise.type)}</h3>
            </div> 
            <div>
                <p>Total Sets : {exercise.n}</p>
                <p>Total Contribution: {contribution}%</p>
            </div>
            <div className="grid grid-cols-4 grid-rows-3">
                <p></p>
                <p className="text-center">Min</p>
                <p className="text-center">Max</p>
                <p className="text-center">Avg</p>
                <h3 className="ml-2 str-white">{exercise.type==0 ? "Reps" : "Time"}</h3>
                {Object.keys(exercise.values).map((key,index)=>{return (<p className="ml-3 text-sm text-center" key={exercise.name+key+index}>{index!=2 ? exercise.values[key][0] + "," +exercise.values[key][1] : exercise.values[key]}</p>)})}
                <h3 className="ml-2 str-white">Weight</h3>
                {Object.keys(exercise.weights).map((key,index)=>{return (<p className="ml-3 text-sm text-center" key={exercise.name+key+index}>{index!=2 ? exercise.weights[key][0] +"," + exercise.weights[key][1] : exercise.weights[key]}</p>)})}
            </div>
            
            
        </div>)
}
