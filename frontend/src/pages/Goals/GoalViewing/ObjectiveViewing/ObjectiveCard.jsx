
// Want to translate the target into something readable for people 

import { cssColorByPercent } from "../../../../utility/color"

// Display the current value we are at for our goal, and then divide the percentage to our value
export default function ObjectiveCard({target,value,percentage}){
    function TranslateTarget(target){
        if(target[0].indexOf("total_") !== -1){
            const str = target[0].split("_")[1]
            return `Total ${str.charAt(0).toUpperCase()+str.substring(1)}`
        }
        if(target[0] === "exercise_totals"){
            switch(Number(target[1])){
                case 0:
                    return "Total Lift Volume"
                case 1:
                    return "Total Cardio Work"
                case 2:
                    return "Total Hold Work"
            }
        }
        else if(target[0]==="exercise_summary"){
            const exercise = target[1]
            const item = target[2] // going to be n(sets), values(reps/time), weights(weight/distance)
            switch(item){
                case "n":
                    return `${exercise} Set Count`
                case "values":
                    return `${exercise} Rep/Time Value`
                case "weights":
                    return `${exercise} Weight/Dist Value`
            }
        }
    }


    return(
        <div className="grid grid-cols-12 m-2">
            <p className="col-span-3 border-b-2 border-gun">{TranslateTarget(target)}</p>
            <p className="col-span-3 border-b-2 border-gun ">{Math.round(value*percentage)}</p>
            <p className="col-span-3 border-b-2 border-gun">{value}</p>
            <p className={"col-span-3 border-b-2 border-gun " + cssColorByPercent(percentage)}>{percentage*100}%</p>
        </div>
    )
}