import { useState } from "react";
import GoalList from "./GoalList";
import GoalMaker from "./GoalMaker";
import GoalPage from "./GoalPage";

export default function Goals(){

    const [addedGoal,setAddedGoal] = useState(false);
    const [viewingGoal, setViewingGoal] = useState(false);
    const [goal, setGoal] = useState({})
   

    
    return(
    <div className="flex flex-col">
        <GoalMaker setAddedGoal={setAddedGoal}></GoalMaker>
        {viewingGoal ? <GoalPage goal={goal} setViewingGoal={setViewingGoal}></GoalPage> : <GoalList setGoal={setGoal} setViewingGoal={setViewingGoal} addedGoal={addedGoal}></GoalList>}
        
    </div>)
    }