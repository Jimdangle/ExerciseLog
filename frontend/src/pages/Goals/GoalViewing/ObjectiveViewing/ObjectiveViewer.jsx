import EditableList from "../../../../components/lists/EditableList/EditableList"
import ExtendoCard from '../../../../components/cards/ExtendoCard/ExtendoCard'
import ObjectiveCard from "./ObjectiveCard"

import { useMemo } from "react"
import { cssColorByPercent } from "../../../../utility/color"

export default function ObjectiveViewer({objectives, completion,remove=()=>{}}){
    const objectiveItems = objectives.map((objective,index)=>{ return {id:objective._id,target:objective.target,value:objective.value,percentage:completion[index]}})


    const overallCompletion = useMemo(()=>{
        return Math.round( (completion.reduce((acum,item) => {return acum+item},0) / completion.length ) *10)/10
    },[completion])

    return(
        <div className="w-full flex justify-center">
            <ExtendoCard styles="w-[80%] bg-white text-gun rounded-md" header={<div className="flex overflow-x-visible justify-center text-lg text-gun font-semibold text-center align-middle"><p className="">Objective Completion</p> <p className={cssColorByPercent(overallCompletion)}>{overallCompletion ? overallCompletion*100 : 0}%</p></div>} footer={<></>} body={<div><GridHeaders></GridHeaders><EditableList title="Objective List" list={objectiveItems} removeAction={remove} componentType={ObjectiveCard} tColor="text-white"/></div>}/>
        </div>
    )
}

function GridHeaders(){
    return(
        <div className="grid grid-cols-12 m-2 font-semibold">
                <p className="col-span-3 border-r-2 border-b-2 border-gun">Target</p>
                <p className="col-span-3 border-r-2 border-b-2 border-gun">Current</p>
                <p className="col-span-3 border-r-2 border-b-2 border-gun">Goal</p>
                <p className="col-span-3 border-b-2 border-gun">Percent</p>
        </div>
    )
}
