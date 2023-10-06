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
            {/* General Summary Info*/}
            <h2 className="h1-white mt-3">General</h2>
            <p>{Summary.total_workouts >1 ? "Total Workouts:" +Summary.total_workouts : ""}</p>    
            <p>Total Exercises: {Summary.total_exercises}</p>    
            {/* Map the index of the array to the type it is and display the total*/}
            <h2 className="h1-white mt-3">Breakdown by Type</h2>
            {Summary.exercise_totals.map( (item,index)=>{
                
                
                return ((index==overlay || overlay==4) ? <p key={"urRacistFatherInLaw"+index}>{TranslateType(index)} Total: <span className="info-blue-lg">{item}{index==0 ? "lb" : "lb*s"}</span></p> : <></>)
            })}

            {/**Impact map and controls for overlay */}
            <h2 className="h1-white text-center mt-3">Impact Map</h2>
            <SummaryCanvas summaryData={Summary} overlay={overlay}></SummaryCanvas>
            <div className='flex flex-row justify-center'>
                <button className={'button ' + (overlay==0 ? 'button-a-green' : 'button-e-green')} onClick={()=>{setOverlay(0)}}>Lifts</button>
                <button className={'button ' + (overlay==1 ? 'button-a-green' : 'button-e-green')} onClick={()=>{setOverlay(1)}}>Cardio</button>
                <button className={'button '+ (overlay==2 ? 'button-a-green' : 'button-e-green')} onClick={()=>{setOverlay(2)}}>Holds</button>
            </div>
            <button className={'button '+ (overlay==4 ? 'button-a-green' : 'button-e-green')} onClick={()=>{setOverlay(4)}}>Total</button>
            
            
    


            <h2 className="h1-white mt-3">Muscle Breakdown by Type</h2>
            {/* Going to list of the % impact on each muscle group for each type this could probably and should probably be turned into a component*/}
            {Summary.muscles.map((impact_map,index)=>{
                const map_total = Summary.exercise_totals[index];//get the total, then map a division onto the impacts
                const percents = impact_map.map((impact)=>{return Math.round((impact/map_total*100))});
                
                const avg = impact_map.reduce((t,v)=>{return t+v},0)/impact_map.length;
                var stdev = impact_map.reduce((t,v)=>{return t+((v-avg)*(v-avg))},0)/(impact_map.length-1);
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
                                if(index == 2 && subindex==6){console.log(`View\n\tstd:${stdev} z:${score}, avg:${avg} -> ${stdColorRed(score)}`)}
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

            <h2 className="h1-white mt-3">Exercise Summary</h2>
            <div className="w-auto h-124 overflow-y-scroll">
                {
                Summary.exercise_summary ? 
                Object.keys(Summary.exercise_summary).map((key,index)=>{
                    const exercise = Summary.exercise_summary[key];
                    
                    const impact = exercise.muscles.reduce((t,i)=>{return t+i},0);
                    
                    return((exercise.type==overlay || overlay==4) 
                    ?
                    <div key={"fffffff"+index} className="mt-5 flex flex-col">
                        <div className="flex border-b-2 mb-2 pb-2 border-dashed border-green-400">
                            <h3 className="mt-2 h2-white">{key}</h3>
                            <h3 className="ml-1 text-sm justify-self-end text-green-400">{TranslateType(exercise.type)}</h3>
                        </div> 
                        <div>
                            <p>Total Sets : {exercise.n}</p>
                            <p>Total Contribution: {Summary.exercise_totals[exercise.type] !=0 ? Math.round((impact/Summary.exercise_totals[exercise.type])*100) : ""}%</p>
                        </div>
                        <div>
                            <h3 className="ml-2 h3-white">{exercise.type==0 ? "Reps" : "Time"}</h3>
                            {Object.keys(exercise.values).map((key,index)=>{return (<p className="ml-3 text-sm" key={exercise.name+key+index}>{key} : {exercise.values[key]}</p>)})}
                            <h3 className="ml-2 h3-white">Weight</h3>
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