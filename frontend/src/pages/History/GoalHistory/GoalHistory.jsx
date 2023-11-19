import { useRequest } from "../../../hooks/requests/useRequest";
import {useEffect, useMemo} from 'react'
import GoalCard from "./GoalCard";
import EditableList from "../../../components/lists/EditableList/EditableList";

export default function GoalHistory({}){
    const {data:histData,loading:histLoading,fetchData:histFetch} = useRequest('/goals/hist');

    useEffect(()=>{
        histFetch();
    },[])

    const goalCards = useMemo(()=>{
        if(histData){
            
            return histData.goals.map((goal,index)=>{
                return {
                    name:goal.name,
                    id:goal._id,
                    timeRemaining: new Date(new Date(goal.end).getTime() - Date.now()).getTime(),
                    objectives: goal.objectives,
                    objectiveCompletion: histData.objectiveCompletion[index]
                }
            })
        }
        return []
    },[histData])


    return (
        <div>
            <p>Goal History</p>
            {goalCards ? 
                <EditableList title="GoalHistory" list={goalCards} removeAction={()=>{}} componentType={GoalCard}/>
                :
                <></>

        }
        </div>
    )

}