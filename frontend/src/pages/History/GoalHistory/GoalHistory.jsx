import { useRequest } from "../../../hooks/requests/useRequest";
import {useEffect, useMemo, useContext} from 'react'
import GoalCard from "./GoalCard";
import EditableList from "../../../components/lists/EditableList/EditableList";
import { PageContext } from "../../PageSelector";
export default function GoalHistory({}){
    const {data:histData,loading:histLoading,fetchData:histFetch} = useRequest('/goals/hist');
    const {data:remData,loading:remLoading,fetchData:remFetch} = useRequest('/goals/rem','x');

    const setPage = useContext(PageContext)
    const removeGoal = async (obj) => {await remFetch({goal_id:obj.id}); await histFetch()}
    useEffect(()=>{
        histFetch();
    },[])


    const makeGoal = () => {setPage(2)}

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
        <div className="mt-4">
            <p className="text-center">Goal History</p>
            {goalCards ? 
                <EditableList title="GoalHistory" list={goalCards} removeAction={removeGoal} componentType={GoalCard} tColor='text-white'/>
                :
                <></>

        }

            <div className="flex justify-center">
                <button className="button button-e-blue" onClick={makeGoal}>Create Goal</button>
            </div>
        </div>
    )

}