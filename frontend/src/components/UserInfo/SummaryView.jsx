import { useEffect, useState } from "react";
import { TokenContext } from "../../views/Home"
import { TranslateMuscle, TranslateType } from "../../utils/muscle";

export default function SummaryView({Summary}){
    //useEffect( ()=>{console.log(stats)})
    
    return( Object.keys(Summary).length>0 ? 
        //Conditionally render the summary data if our summary object has keys
        <div className="flex flex-col mt-3 border-t-2">
            <p className="text-xs text-yellow-400">I Literally think i made up lb*s as a unit for measuring exercise its just the product between the time value and the additional weight field which should correspond to more effort in some sense</p>
            <h1 className="text-center text-white text-2xl font-semibold underline">Summary</h1>
            {/* General Summary Info*/}
            <h2 className="text-white text-xl font-semibold">General</h2>
            <p>Total Workouts: {Summary.total_workouts}</p>    
            <p>Total Exercises: {Summary.total_exercises}</p>    
            {/* Map the index of the array to the type it is and display the total*/}
            
            {Summary.exercise_totals.map( (item,index)=>{
                
                
                return (<p key={"urRacistFatherInLaw"+index}>{TranslateType(index)} Total: {item}{index==0 ? "lb" : "lb*s"}</p>)
            })}

            {/* Going to list of the % impact on each muscle group for each type */}
            {Summary.muscles.map((impact_map,index)=>{
                const map_total = Summary.exercise_totals[index];//get the total, then map a division onto the impacts
                const percents = impact_map.map((impact)=>{return (impact/map_total)*100});
                
                return (
                   
                    <div key={"FreakShowDumpTruckCumGobbler"+index*9000} className="flex flex-col">
                         {/* You might ask whats up with the keys, but I can't seem to not get the unique key warning without some obscene shit so here we are maybe ur upset bc you feel targeted but its not personal*/}
                        <h3 className="ml-2 text-start text-white font-semibold underline">{TranslateType(index)}{index==0 || index==2 ? "s" : ""}</h3>
                        {percents.map((percent,subindex)=>{
                            
                            return (
                                percent ?
                                <p className="ml-4" key={"urCoolCat"+subindex+"urMom"+index}>{TranslateMuscle(subindex)} : {percent}%</p>
                                :
                                <p key={"urCoolCat"+subindex+"urMom"+index}>{/*Weird that this one doesnt show up as a normal element */}</p>
                                )
                            })}
                    </div>
                )
            })}

        </div> : 
        <></>)
}