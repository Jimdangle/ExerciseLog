import {useRequest} from "../../hooks/requests/useRequest"
import { useEffect, useMemo } from "react";
import { removeSpace, colorByZScore } from "../../utility/image"
// Given muscle data as a object containing { muscle_name: z-score, ... }
// Define the width of the image, height is determined by width and ratio
const IMAGE_R = 0.887; // The initial ratio is 1400x1242 so this is 1242/1400

export default function MuscleOverlay({width=800, muscleData, muscles}){
    
    



    return (
        <div className={"relative top-0"}>
            <img className="absolute top-0 left-0"  src="MuscleOutlines/MuscleDiagram.png" style={{width: width, height: width*IMAGE_R}} alt="Main Diagram"/>
            {
                muscles && muscleData ? 
                muscles.map((muscle, index)=>{
                    if(muscleData[0][muscle]){
                        return <img className="absolute top-0 left-0" key={muscle+index}  style={{width: width, height: width*IMAGE_R}} src={`MuscleOutlines/${removeSpace(muscle)}${colorByZScore(muscleData[0][muscle])}.png`} alt={`${muscle} outline`}/>
                    }
                    return <img className="absolute top-0 left-0" key={muscle+index}  style={{width: width, height: width*IMAGE_R}} src={`MuscleOutlines/${removeSpace(muscle)}R.png`} alt={`${muscle} outline`}/>
                })
                :
                <></>
            }
            
            
            
        </div>
    )
}