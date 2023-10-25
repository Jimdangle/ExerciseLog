import EditableList from "../../../components/lists/EditableList/EditableList";
import { useMemo, useContext } from "react";

import {useRequest} from '../../../hooks/requests/useRequest'
import { RefreshContext } from "..";
export default function SetDisplay({exercise}){

    const refresh = useContext(RefreshContext)
    // Update our sets if our sets  have been touched
    const sets = useMemo(()=> {
        return exercise.sets;
    },[exercise.sets])

    const {data:removeData,isLoading:removeLoading,error:removeError,fetchData:removeFetch} = useRequest('/workout/remSet', 'x', {exercise_id:exercise._id})

    async function remove(object){
        removeFetch({set_id:object._id})
        refresh();
    }



    return (
        <EditableList title={"Sets"} list={sets} removeAction={remove} componentType={SetComponent}/>
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