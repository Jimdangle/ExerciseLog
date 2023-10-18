import { useEffect } from 'react'
import useFetch from '../../hooks/requests/useFetch'
import { getLog } from '../../utility/storage'
export default function Workout(){
    const log = getLog()
    const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})

    useEffect(()=>{console.log(data)},[data])
    return(
    <div className='text-white'>
        
        {isLoading ? "Loading Data" : "Done"}
        {data && data.workout ? <p>{data.workout.name}</p> : <></>}
    </div>)
}