import EditableList from "../../../../components/lists/EditableList/EditableList"
import ExtendoCard from '../../../../components/cards/ExtendoCard/ExtendoCard'
import ObjectiveCard from "./ObjectiveCard"

import { useMemo } from "react"

export default function ObjectiveViewer({objectives, completion,remove=()=>{}}){
    const objectiveItems = objectives.map((objective,index)=>{ return {id:objective._id,target:objective.target,value:objective.value,percentage:completion[index]}})

   

    const overallCompletion = useMemo(()=>{
        return Math.round( (completion.reduce((acum,item) => {return acum+item},0) / completion.length ) *10)/10
    },[completion])

    return(
        <div>
            <ExtendoCard header={<div className="flex justify-center"><p className="text-lg font-semibold text-center">Objective Completion : {overallCompletion}%</p></div>} footer={<></>} body={<EditableList title="Objective List" list={objectiveItems} removeAction={remove} componentType={ObjectiveCard} tColor="text-white"/>}/>
        </div>
    )
}

