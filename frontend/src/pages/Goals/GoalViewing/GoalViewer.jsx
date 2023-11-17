import {useRequest} from '../../../hooks/requests/useRequest'
import { useEffect, useMemo } from 'react'
import { goalStore } from '../../../utility/storage'
export default function GoalViewer({}){
    const goal_id = goalStore.get()
    console.log(goal_id)
    const {data,isLoading,error,fetchData} = useRequest('/goals/get', 'p')
    
    useEffect(()=>{
        if(goal_id)
            fetchData({goal_id:goal_id});
    },[goal_id])


    const goal = useMemo(()=>{
        if(data && data.goal){
            return data.goal
        }
    },[data])


    return(
        <>
            {goal ? 
                <div className="flex flex-col">
                    <p className='text-center font-semibold text-lg'>{goal.name}</p>
                    <p>{}</p>
                </div>
                :
                <></>
            }
        </>
    )
}