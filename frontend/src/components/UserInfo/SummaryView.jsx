import { useEffect, useState } from "react";
import { TokenContext } from "../../views/Home"
import { TranslateMuscle, TranslateType } from "../../utils/muscle";
import { percentageColor, percentageColorRed, stdColorRed } from "../../utils/styleutil";
import SummaryCanvas from "./SummaryCanvas";
export default function SummaryView({Summary}){

    const [overlay,setOverlay] = useState(0);
    
    //Make this use the overlay to determine what to display so the map makes sense with all the data (also show by type)
    return( Summary && Object.keys(Summary).length>1 ? 
        //Conditionally render the summary data if our summary object has keys


        <div className="flex flex-col mt-3 pt-3 border-t-2 text-white">
            <SummaryCanvas summaryData={Summary} overlay={overlay}></SummaryCanvas>
            <div className='flex flex-row justify-center'>
                <button className={'button button-e-green' + (overlay==0 ? ' bg-white text-green-400' : '')} onClick={()=>{setOverlay(0)}}>Lifts</button>
                <button className={'button button-e-green' + (overlay==1 ? ' bg-white text-green-400' : '')} onClick={()=>{setOverlay(1)}}>Cardio</button>
                <button className={'button button-e-green'+ (overlay==2 ? ' bg-white text-green-400' : '')} onClick={()=>{setOverlay(2)}}>Holds</button>
            </div>
            <button className={'button button-e-green'+ (overlay==4 ? ' bg-white text-green-400' : '')} onClick={()=>{setOverlay(4)}}>Total</button>
            <p className="text-xs text-yellow-400">I Literally think i made up lb*s as a unit for measuring exercise its just the product between the time value and the additional weight field which should correspond to more effort in some sense</p>
            <h1 className="text-center text-white text-2xl font-semibold underline">Summary</h1>
            {/* General Summary Info*/}
            <h2 className="text-white text-xl mt-3 font-semibold">General</h2>
            <p>{Summary.total_workouts >1 ? "Total Workouts:" +Summary.total_workouts : ""}</p>    
            <p>Total Exercises: {Summary.total_exercises}</p>    
            {/* Map the index of the array to the type it is and display the total*/}
            <h2 className="text-white text-xl font-semibold mt-3">Breakdown by Type</h2>
            {Summary.exercise_totals.map( (item,index)=>{
                
                
                return ((index==overlay || overlay==4) ? <p key={"urRacistFatherInLaw"+index}>{TranslateType(index)} Total: {item}{index==0 ? "lb" : "lb*s"}</p> : <></>)
            })}



        <h2 className="text-white text-lg mt-3 font-semibold">Muscle Breakdown by Type</h2>
            {/* Going to list of the % impact on each muscle group for each type this could probably and should probably be turned into a component*/}
            {Summary.muscles.map((impact_map,index)=>{
                const map_total = Summary.exercise_totals[index];//get the total, then map a division onto the impacts
                const percents = impact_map.map((impact)=>{return Math.round((impact/map_total*100))});
                
                const avg = impact_map.reduce((t,v)=>{return t+v},0)/impact_map.length;
                var stdev = impact_map.reduce((t,v)=>{return t+((v-avg)*(v-avg))},0)/impact_map.length-1;
                stdev = Math.sqrt(stdev);

                const std_scores = impact_map.map((item,index)=>{
                    const zeta = (item-stdev)/avg // # of stdevs away from mean
                    
                    return zeta;
                })

                return ( (overlay ==4 || index == overlay )
                ? 
                
                   
                    <div key={"FreakShowDumpTruckCumGobbler"+index*9000} className="flex flex-col">
                         {/* You might ask whats up with the keys, but I can't seem to not get the unique key warning without some obscene shit so here we are maybe ur upset bc you feel targeted but its not personal*/}
                        <h3 className="ml-2 text-start text-white font-semibold underline">{TranslateType(index)}{index==0 || index==2 ? "s" : ""}</h3>
                        <div className="flex flex-col">
                            {std_scores.map((score,subindex)=>{
                                
                                return (
                                    score ?
                                    <p className={"ml-4"} key={"urCoolCat"+subindex+"urMom"+index}>{TranslateMuscle(subindex)} : <span className={stdColorRed(score)}>{percents[subindex]}%</span> </p>
                                    :
                                    <p key={"urCoolCat"+subindex+"urMom"+index}>{/*Weird that this one doesnt show up as a normal element */}</p>
                                    )
                                })}
                        </div>
                        
                    </div>
                :
                    <></>
                )
            })}

            <h2 className="text-white text-xl mt-3 font-semibold">Exercise Summary</h2>
            <div className="w-auto h-124 overflow-y-scroll">
                {
                Summary.exercise_summary ? 
                Object.keys(Summary.exercise_summary).map((key,index)=>{
                    const exercise = Summary.exercise_summary[key];
                    
                    const impact = exercise.muscles.reduce((t,i)=>{return t+i},0);
                    
                    return((exercise.type==overlay || overlay==4) 
                    ?
                    <div key={"fffffff"+index} className="mt-3 flex flex-col">
                        <div className="flex">
                            <h3 className="mt-2 font-semibold">{key}</h3>
                            <h3 className="ml-1 text-sm justify-self-end">{TranslateType(exercise.type)}</h3>
                        </div>
                        <div>
                            <p>Total Sets : {exercise.n}</p>
                            <p>Total Contribution: {Summary.exercise_totals[exercise.type] !=0 ? Math.round((impact/Summary.exercise_totals[exercise.type])*100) : ""}%</p>
                        </div>
                        <div>
                            <h3 className="ml-2 font-semibold">{exercise.type==0 ? "Reps" : "Time"}</h3>
                            {Object.keys(exercise.values).map((key,index)=>{return (<p className="ml-3 text-sm" key={exercise.name+key+index}>{key} : {exercise.values[key]}</p>)})}
                            <h3 className="ml-2 font-semibold">Weight</h3>
                            {Object.keys(exercise.weights).map((key,index)=>{return (<p className="ml-3 text-sm" key={exercise.name+key+index}>{key} : {exercise.weights[key]}</p>)})}
                        </div>
                        
                        {exercise.muscles.map((item,index)=>{
                            return (
                                <div key={"poooop"+index} className="flex flex-row">
                                    {item >0 ? <p className="ml-2 text-sm">{TranslateMuscle(index)} - {item}</p> : ""}
                                </div>)
                        })}
                    </div>
                    :
                    <></>
                    )
                })
                :
                <></>
                }
            </div>

        </div> : 
        <></>)
}