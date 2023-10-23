import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import useFetch from '../../../hooks/requests/useFetch'
import { useEffect } from "react";
export default function ExerciseList(){

    const {data,isLoading,error} = useFetch('/motion/ls');

    useEffect(()=>{console.log(data)},[data])

    const items = [
        {t:"test1asdasdasd", a: '1'},
        {t:"test2", a: '2'},
        {t:"test3", a: '3'},
        {t:"test4", a: '4'},
    ]

    function action(key){
        console.log(`Action id ${key}`)
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