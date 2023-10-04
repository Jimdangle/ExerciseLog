import { useState } from "react";
import GoalList from "./GoalList";
import GoalMaker from "./GoalMaker";
import GoalPage from "./GoalPage";

export default function Goals(){
    
   const [viewingGoal, setViewingGoal] = useState(false);
   const [goal, setGoal] = useState({})

    
    return(
    <div>
        <GoalMaker></GoalMaker>
        {viewingGoal ? <GoalPage goal={goal} setViewingGoal={setViewingGoal}></GoalPage> : <GoalList setGoal={setGoal} setViewingGoal={setViewingGoal}></GoalList>}
        
    </div>)
    }