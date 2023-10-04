export default function GoalItem({goal, setGoal, setViewingGoal}){

    return(<div className="w-64 bg-slate-600 flex flex-col mt-3 justify-center" onClick={()=>{setGoal(goal);setViewingGoal(true)}}>
        <h1>{goal.name ? goal.name.slice(0,15) : "No Name"}</h1>
        <h2>Start: {goal.start.toString()}</h2>
        <h2>End: {goal.end.toString()}</h2>
        <button className="button button-e-green">Change Objectives</button>
    </div>)
}