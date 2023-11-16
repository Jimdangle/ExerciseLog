import EditableList from "../../../../components/lists/EditableList/EditableList";
import { useMemo, useContext, useEffect, useState } from "react";
import {useRequest} from '../../../../hooks/requests/useRequest'
import CoolForm from "../../../../components/forms/CoolForm";
import SetLift from "./SetTypes/SetLift";
import SetCardio from "./SetTypes/SetCardio";
import LiftAdder from "./SetAdders/LiftAdder";
import CardioAdder from "./SetAdders/CardioAdder";
import { SummaryContext } from "../..";
import ExtendoCard from "../../../../components/cards/ExtendoCard/ExtendoCard";
import SetAdder from "./SetAdders/SetAdder";
/**
 * Component to display sets 
 * @param {{Object}} props - main property object
 * @param {Object} props.exercise - Exercise Object returned from outer get request
 * @param {function} props.refresh - Exercise Object returned from outer get request
 * @component
 * @description Render sets from an exercise and allow us to remove, and add more sets onto it
 */
export default function SetDisplay({exercise, type}){

    
    const [sets,setSets] = useState([]);
    const sumFetch = useContext(SummaryContext)

    // Request to remove a set
    const {data:removeData,isLoading:removeLoading,error:removeError,fetchData:removeFetch} = useRequest('/workout/remSet', 'x', {exercise_id:exercise._id})
    // Request to add a set
    const {data:addData, isLoading:addLoading, error:addError, fetchData:addFetch} = useRequest('/workout/addSet', 'p', {exercise_id:exercise._id})
    // Request to fetch our sets for this exercise
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

    useEffect(()=>{
        if(addError){
            console.error(addError)
        }
    },[addError])

    /**
     * removeAction for our editable list
     * @param {Object} object - object from the list to remove
      */
    async function remove(object){
        await removeFetch({set_id:object._id})
        await getFetch();
        await sumFetch();
    }

    async function addSet(data){
        await addFetch(data);
        await getFetch();
        await sumFetch();
    }


    return (
        <div>
            <ExtendoCard styles="bg-slate-200 relative left-[12.5%] w-3/4"  header={<SetDisplayHeader setCount={sets.length} />} body={<EditableList title={"Sets"} list={sets} removeAction={remove} componentType={(type===0 ? SetLift : SetCardio)}/>} footer={<SetDisplayFooter last={sets[sets.length-1]} type={type}/>}/>
            
            <SetAdder type={type} addSet={addSet} last={sets[sets.length-1]}/>
        </div>
        
    )
}


function SetDisplayHeader({setCount})
{
    return (
        <p>Sets: {setCount} </p>
    )
}

function SetDisplayFooter({last, type}){
    if(last)
        return (<>{type===0 ? <SetLift {...last}/> : <SetCardio{...last}/>}</>)
    else{
        return <></>
    }
}
