import {useRequest} from '../../../hooks/requests/useRequest'
import { useEffect, useMemo,useState } from 'react'
import { goalStore } from '../../../utility/storage'
import TimeRemaining from './TimeRemaining'
import ObjectiveMaker from './ObjectiveMaking/ObjectiveMaker'

export default function GoalViewer({}){
    const goal_id = goalStore.get()
    
    const {data,isLoading,error,fetchData} = useRequest('/goals/get', 'p')
    const [timeDiff,setTimeDiff] = useState(0)
    const [timeRemaining,setTimeRemaining] = useState({days:0,hours:0,minutes:0})

    const [goal,setGoal] = useState(null)
    
    useEffect(()=>{
        if(goal_id)
            fetchData({goal_id:goal_id});
    },[])

    


    useEffect(()=>{//update when we get data
        if(data && data.goal){
           if(timeDiff===0){
                setTimeDiff(new Date(new Date(data.goal.end).getTime() - Date.now()).getTime()); // set the time difference based on when we load a goal
           }
           setGoal(data.goal)
           const timeInterval = setInterval(()=>{
            console.log('subtracting time')
            setTimeDiff((old)=>{return old-30000;})},30000);

           return ()=>{
                clearInterval(timeInterval);
           }
        }

    },[data])

    useEffect(()=>{
        setTimeRemaining(createTimeObject(timeDiff))

    },[timeDiff])

    function createTimeObject(timeDifference){ // create the time object we want based on miliseconds
            const seconds = Math.floor(timeDifference / 1000);
            const days = Math.floor(seconds / (3600 * 24));
            const remainingSeconds = seconds % (3600 * 24);
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            return {days:days,hours:hours,minutes:minutes}
    }


    return(
        <>
            {goal ? 
                <div className="flex flex-col my-3 text-center">
                    <p className='font-semibold text-2xl'>{goal.name}</p>
                    <TimeRemaining timeRemaining={timeRemaining}/>
                    <ObjectiveMaker/>
                </div>
                
                :
                <></>
            }
        </>
    )
}