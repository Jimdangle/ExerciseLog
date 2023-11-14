import {useRef, useEffect} from 'react'
import { removeSpace, colorByZScore } from "../../utility/image"
// Given muscle data as a object containing { muscle_name: z-score, ... }
// Define the width of the image, height is determined by width and ratio
const IMAGE_R = 0.887; // The initial ratio is 1400x1242 so this is 1242/1400

export default function MuscleOverlay({width=800, muscleData, muscles, filter=0}){
    const canvasRef = useRef(null);

    useEffect(()=>{
        drawCanvas();
    },[muscleData,filter])
    

    function drawCanvas(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const mainDiagram = new Image();
        mainDiagram.src = "MuscleOutlines/MuscleDiagram.png";
        mainDiagram.onload = () => {
            ctx.drawImage(mainDiagram,0,0, width, width*IMAGE_R);

            if(muscles && muscleData){
                muscles.forEach((muscle,index)=>{
                    const muscleOverlay = new Image();
                    const src = muscleData[filter][muscle] ? 
                        `MuscleOutlines/${removeSpace(muscle)}${colorByZScore(muscleData[0][muscle])}.png`
                        :
                        `MuscleOutlines/${removeSpace(muscle)}B.png`
                    muscleOverlay.src = src;
                    muscleOverlay.onload = () => {
                        ctx.drawImage(muscleOverlay,0,0,width,width*IMAGE_R)
                    }
                })
            }

            
        }

    }


    function handleMouseMove(event){
        const rect = canvasRef.current ? canvasRef.current.getBoundingClientRect() : {left:0,top:0} // get a reference or set to 0
        const adjusted = {x: event.clientX - rect.left, y: event.clientY - rect.top} // adjust to our canvas so we get correct/consistent coords
        console.log(`Adjusted: (${adjusted.x}, ${adjusted.y})`)

        
    }
    

    return (
        <div className='flex justify-center'>
            <canvas onMouseMove={handleMouseMove} ref={canvasRef} width={width} height={width * IMAGE_R} />
        </div>
    )       
}