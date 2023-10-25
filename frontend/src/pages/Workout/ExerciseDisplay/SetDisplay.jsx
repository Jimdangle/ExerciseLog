import EditableList from "../../../components/lists/EditableList/EditableList";
import { useMemo } from "react";

export default function SetDisplay({exercise}){
    const sets = useMemo(()=> {
        return exercise.sets;
    },[exercise.sets])




    return (
        <EditableList title={"Sets"} list={sets} removeAction={()=>{console.log("remove action")}} componentType={SetComponent}/>
    )
}

function SetComponent({rep_or_time,added_weight}){
    return (
        <div className="flex justify-between">
            <p>{rep_or_time}</p>
            <p className="ml-auto">{added_weight}</p>
        </div>
    )
}