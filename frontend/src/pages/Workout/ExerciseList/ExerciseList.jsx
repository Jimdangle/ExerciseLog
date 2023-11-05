import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import useFetch from '../../../hooks/requests/useFetch'
import { useEffect, useState } from "react";
import { useRequest } from "../../../hooks/requests/useRequest";
import MotionModal from "../MotionAdder/MotionModal";
/**
 * A list of exercises for users to choose from to add onto their workout
 * @param {{string,function,function}} props
 * @param {string} props.log_id - the id of the log we want to pull information from, and add to 
 * @param {function} props.refresh - function passed to re-display information 
 * @param {function} props.closeModal - function passed by the modal container we can use to close the modal when we add a exercise 
 * @returns 
 */
export default function ExerciseList({log_id,refresh,closeModal}){

    const {data,isLoading,error, fetchData:getData} = useRequest('/motion/lsa')
    

    const {data:postData,fetchData:postFetchData} = useRequest('/workout/addEx','p',{workout_id:log_id})

    useEffect(()=>{
        if(!isLoading)
            getData();
    },[])

    
    

    
    async function action(key){
        await postFetchData({motion_id:key})
        await refresh();
        closeModal();
    }

    
    

    return (
        <div className="h-64 overflow-y-scroll">
            <MotionModal getData={getData}/>
            {!isLoading && data && data.motions ? 
            <SearchableList title={"Test List"} list={data.motions} action={action} fields={{display_field:'name', action_field:'_id'}}></SearchableList>
            :
            <></>
        }    
        </div>
        
    )

}