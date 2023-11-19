import {useRequest} from '../../../hooks/requests/useRequest'
import { useEffect, useMemo,useState } from 'react'
import { goalStore } from '../../../utility/storage'
import TimeRemaining from './TimeRemaining'
import ObjectiveMaker from './ObjectiveMaking/ObjectiveMaker'
import ObjectiveViewer from './ObjectiveViewing/ObjectiveViewer'
import { createTimeObject } from '../../../utility/time'

export default function GoalViewer({}){
    const goal_id = goalStore.get()
    
    const {data,fetchData} = useRequest('/goals/get', 'p')
    const {data:objData,fetchData:objFetch} = useRequest('/goals/getObjs','p')
    const [timeDiff,setTimeDiff] = useState(0)
    const [timeRemaining,setTimeRemaining] = useState({days:0,hours:0,minutes:0})

    const [goal,setGoal] = useState(null)
    
    async function refresh(){
        await fetchData({goal_id:goal_id});
        await objFetch({goal_id:goal_id});
    }

    useEffect(()=>{
        if(goal_id)
            refresh()
    },[])

    


    useEffect(()=>{//update when we get data
        if(data && data.goal){
           if(timeDiff===0){
                setTimeDiff(new Date(new Date(data.goal.end).getTime() - Date.now()).getTime()); // set the time difference based on when we load a goal
           }
           setGoal(data.goal)
           const timeInterval = setInterval(()=>{
            
            setTimeDiff((old)=>{return old-30000;})},30000);

           return ()=>{
                clearInterval(timeInterval);
           }
        }

    },[data])

    useEffect(()=>{
        if(objData){console.log(objData)}

    },[objData])

    useEffect(()=>{
        setTimeRemaining(createTimeObject(timeDiff))

    },[timeDiff])

   


    return(
        <>
            {goal ? 
                <div className="flex flex-col my-3 text-center">
                    <p className='font-semibold text-2xl'>{goal.name}</p>
                    <TimeRemaining timeRemaining={timeRemaining}/>
                    {objData ? 
                        <ObjectiveViewer objectives={objData.objectives} completion={objData.objectiveCompletion}/>
                        :
                        <></>
                    }
                    <ObjectiveMaker goal_id={goal_id} refresh={refresh}/>
                    
                </div>
                :
                <></>
            }
        </>
    )
}