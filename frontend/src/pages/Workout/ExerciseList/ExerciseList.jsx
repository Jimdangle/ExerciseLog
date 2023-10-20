import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import useFetch from "../../../hooks/requests/useFetch";
import { useEffect, useState } from "react";
import { request } from "../../../utility/request";
export default function ExerciseList({id}){
    const {data, isLoading, error} = useFetch('/motion/lsa');

    const [postData,setPostData] = useState(null)


    useEffect(()=>{
        
        if(error)console.log(error)
    },[data,isLoading,error])
    

    function action(key){
        console.log(`Action id ${key}`)
    }

    async function AddExercise(key){
       await request('/workout/addEx', setPostData, 'p', {motion_id:key,workout_id:id})
    }



    return (
        (isLoading===false && data && data.motions) ? 
        <SearchableList title={"Test List"} list={data.motions} action={AddExercise} fields={{display_field:'name', action_field:'_id'}}></SearchableList>
        :
        <></>
        
    )

}