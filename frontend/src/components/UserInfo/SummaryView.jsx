import { useEffect, useState } from "react";
import { TokenContext } from "../../views/Home"

export default function SummaryView({stats}){
    //useEffect( ()=>{console.log(stats)})
    
    return(stats ? <div className="flex flex-col">
        <p>Total Workouts - {stats.total_workouts}</p>
        <p>Total Exercises - {stats.total_exercises}</p>
        <p>Total Volume - {stats.total_volume}(lbs)</p>
        <p>Heaviest Lift - {stats.heaviest_weight ? stats.heaviest_weight.name : ""}</p>
        <p>Most Reps - {stats.highest_reps ? stats.highest_reps.name : ""}</p>
        
        <p className="font-bold mt-2">Motion Summaries</p>
        <div className="overflow-scroll h-64 mb-6 bg-slate-100">
            {stats.motion_data ? Object.keys(stats.motion_data).map((item,index)=>{
                return (
                <div className="mt-2" key={index}>
                    <p className="font-semibold">{stats.motion_data[item].name}:</p>
                    <p className="text-center">Highest Weight: {stats.motion_data[item].weight}</p>
                    <p className="text-center">Highest Reps: {stats.motion_data[item].reps}</p>
                    <p className="text-center">Attempts: {stats.motion_data[item].count}</p>
                </div>)
            }): <></>}
        </div>
    </div> : <></>)
}