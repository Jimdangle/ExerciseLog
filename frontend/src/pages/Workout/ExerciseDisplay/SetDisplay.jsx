import EditableList from "../../../components/lists/EditableList/EditableList";
import { useMemo, useContext, useEffect, useState } from "react";
import {useRequest} from '../../../hooks/requests/useRequest'
import { RefreshContext } from "..";

/**
 * Component to display sets 
 * @param {{Object}} props - main property object
 * @param {Object} props.exercise - Exercise Object returned from outer get request
 * @component
 * @description Render sets from an exercise and allow us to remove, and add more sets onto it
 */
export default function SetDisplay({exercise}){

    const refresh = useContext(RefreshContext)
    const [sets,setSets] = useState([]);
    

    

    //Make our request to remove the set from the list 
    const {data:removeData,isLoading:removeLoading,error:removeError,fetchData:removeFetch} = useRequest('/workout/remSet', 'x', {exercise_id:exercise._id})
    
    // request to fetch our sets for this exercise
    const {data:getData, isLoading:getIsLoading, error:getError, fetchData:getFetch} = useRequest('/workout/getEx', 'p', {exercise_id:exercise._id})
    
    // One use effect for when data is changed
    useEffect(()=>{
        if(getData && getData.exercise){
            setSets(getData.exercise.sets)
        }
    },[getData])
    //use effect to get data first
    useEffect(()=>{
        getFetch();
        if(getData && getData.exercise){
            setSets(getData.exercise.sets)
        }
    },[])

    /**
     * removeAction for our editable list
     * @param {Object} object - object from the list to remove
      */
    async function remove(object){
        await removeFetch({set_id:object._id})
        await getFetch();
    }



    return (
        <EditableList title={"Sets"} list={sets} removeAction={remove} componentType={SetComponent}/>
    )
}


/**
 * In house component that serves as the class the editable list will render for us
 * @param {{number,number}} props 
 * @param {number} props.rep_or_time - rep or time value from the set
 * @param {number} props.added_weight - additional weight for the exercise
 * @description **Note** these parameters match the set object we are sending to editable list
 */
function SetComponent({rep_or_time,added_weight}){
    return (
        <div className="flex justify-between">
            <p>{rep_or_time}</p>
            <p className="ml-auto">{added_weight}</p>
        </div>
    )
}