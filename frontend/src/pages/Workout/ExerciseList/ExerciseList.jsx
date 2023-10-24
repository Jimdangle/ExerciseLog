import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import useFetch from '../../../hooks/requests/useFetch'
import { useEffect, useState } from "react";
import { useRequest } from "../../../hooks/requests/useRequest";
export default function ExerciseList({log_id,refresh,closeModal}){

    const {data,isLoading,error, fetchData} = useRequest('/motion/ls')
    

    const {fetchData:postFetchData} = useRequest('/workout/addEx','p',{workout_id:log_id})

    useEffect(()=>{
        fetchData();
    },[])

    
    async function action(key){
        postFetchData({motion_id:key})
        refresh();
        closeModal();
    }

    
    

    return (
        <div className="h-64 overflow-y-scroll">
            {!isLoading && data && data.motions ? 
            <SearchableList title={"Test List"} list={data.motions} action={action} fields={{display_field:'name', action_field:'_id'}}></SearchableList>
            :
            <></>
        }    
        </div>
        
    )

}