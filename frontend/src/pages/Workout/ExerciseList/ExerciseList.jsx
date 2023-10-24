import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import useFetch from '../../../hooks/requests/useFetch'
import { useEffect, useState } from "react";
import { useRequest } from "../../../hooks/requests/useRequest";
export default function ExerciseList({log_id,refresh,closeModal}){

    const {data,isLoading,error, fetchData:getData} = useRequest('/motion/ls')
    

    const {fetchData:postFetchData} = useRequest('/workout/addEx','p',{workout_id:log_id})

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
            {!isLoading && data && data.motions ? 
            <SearchableList title={"Test List"} list={data.motions} action={action} fields={{display_field:'name', action_field:'_id'}}></SearchableList>
            :
            <></>
        }    
        </div>
        
    )

}