import { stdColorRed } from "../../utils/styleutil";
import { TranslateMuscle, TranslateType } from "../../utils/muscle";

export default function ExerciseSummary({name,exercise,contribution}){
    
    
    return (

        <div className="mt-5 flex flex-col">
            <div className="flex border-b-2 mb-2 pb-2 border-dashed border-ogreen">
                <h3 className="mt-2 h2-white">{name}</h3>
                <h3 className="ml-1 text-sm justify-self-end text-ogreen">{TranslateType(exercise.type)}</h3>
            </div> 
            <div>
                <p>Total Sets : {exercise.n}</p>
                <p>Total Contribution: {contribution}%</p>
            </div>
            <div>
                <h3 className="ml-2 h3-white">{exercise.type==0 ? "Reps" : "Time"}</h3>
                {Object.keys(exercise.values).map((key,index)=>{return (<p className="ml-3 text-sm" key={exercise.name+key+index}>{key} : {exercise.values[key]}</p>)})}
                <h3 className="ml-2 h3-white">Weight</h3>
                {Object.keys(exercise.weights).map((key,index)=>{return (<p className="ml-3 text-sm" key={exercise.name+key+index}>{key} : {exercise.weights[key]}</p>)})}
            </div>
            
            {exercise.muscles.map((item,index)=>{
                return (
                    <div key={"poooop"+index} className="flex flex-row">
                        {item >0 ? <p className="ml-2 text-sm">{TranslateMuscle(index)} - {item}</p> : ""}
                    </div>)
            })}
        </div>)
}
