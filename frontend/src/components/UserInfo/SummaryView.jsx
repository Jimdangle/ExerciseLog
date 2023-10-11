import { useEffect, useState } from "react";
import { TokenContext } from "../../views/Home"
import { TranslateMuscle, TranslateType } from "../../utils/muscle";
import { percentageColor, percentageColorRed, stdColorRed } from "../../utils/styleutil";
import SummaryCanvas from "./SummaryCanvas";
import ExerciseSummary from "./ExerciseSummary";
import TypeSummary from "./TypeSummary";
export default function SummaryView({Summary}){

    const [overlay,setOverlay] = useState(0);
    
    //Make this use the overlay to determine what to display so the map makes sense with all the data (also show by type)
    return( Summary && Object.keys(Summary).length>1 ? 
        //Conditionally render the summary data if our summary object has keys


        <div className="flex flex-col mt-3 pt-3 border-t-2 text-white">
            
            <h2 className="h1-white mt-3">General</h2>
            <p>{Summary.total_workouts >1 ? "Total Workouts:" +Summary.total_workouts : ""}</p>    
            <p>Total Exercises: {Summary.total_exercises}</p>    
            
            <h2 className="h1-white mt-3">Breakdown by Type</h2>
            {Summary.exercise_totals.map( (item,index)=>{
                
                
                return ((index==overlay || overlay==4) ? <p key={`dagabagool${index}goool`}>{TranslateType(index)} Total: <span className="info-blue-lg">{item}{index==0 ? "lb" : "lb*s"}</span></p> : <p key={`thiswasaproblem${index}`}></p>)
            })}

            {/**Impact map and controls for overlay */}
            <h2 className="h1-white text-center mt-3">Impact Map</h2>
            <SummaryCanvas summaryData={Summary} overlay={overlay}></SummaryCanvas>
            <div className='flex flex-row justify-center'>
                <button className={'button ' + (overlay==0 ? 'button-a-blue' : 'button-e-blue')} onClick={()=>{setOverlay(0)}}>Lifts</button>
                <button className={'button ' + (overlay==1 ? 'button-a-blue' : 'button-e-blue')} onClick={()=>{setOverlay(1)}}>Cardio</button>
                <button className={'button '+ (overlay==2 ? 'button-a-blue' : 'button-e-blue')} onClick={()=>{setOverlay(2)}}>Holds</button>
            </div>
            <button className={'button place-self-center w-24 '+ (overlay==4 ? 'button-a-blue' : 'button-e-blue')} onClick={()=>{setOverlay(4)}}>Total</button>
            
            
    


            <h2 className="h1-white mt-3">Muscle Breakdown by Type</h2>
            {/* Going to list of the % impact on each muscle group for each type this could probably and should probably be turned into a component*/}
            {Summary.muscles.map((impact_map,index)=>{
                const should_render = (overlay ==4 || index == overlay )
                const map_total = Summary.exercise_totals[index];//get the total, then map a division onto the impacts

                return ( should_render
                ? 
                
                <TypeSummary key={"idontlikeuniquekeys"+index} imp_map={impact_map} map_tot={map_total} ind={index}></TypeSummary>
                :
                <div key={"reactisextremelyhomophobic"+index}></div>
                )
            })}

            {/**It is actually beyond fucking stupid that you have to also provide a "unique" key when there is nothing rendered <></> big brain huge fucking iq can't believe i didnt put that in a library . I wish  that was my contribution to science*/}
            <h2 className="h1-white mt-3">Exercise Summary</h2>
            <div className="w-auto h-124 overflow-y-scroll">
                
                {
                Summary.exercise_summary ? 
                Object.keys(Summary.exercise_summary).map((key,index)=>{
                    const exercise = Summary.exercise_summary[key]; // store our current exercise
                    
                    //Calculating the work done
                    const impact = exercise.muscles.reduce((t,i)=>{return t+i},0);//total impact of this exercise
                    const contribution = Summary.exercise_totals[exercise.type] !=0 ? Math.round((impact/Summary.exercise_totals[exercise.type])*100): 0; // contribution %

                    {/* If the overlay matches the exercise type or we are looking at total */}
                    return((exercise.type==overlay || overlay==4) 
                    ?
                    <ExerciseSummary name={key} key={"cantriskit"+index} exercise={exercise} contribution={contribution}></ExerciseSummary>
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