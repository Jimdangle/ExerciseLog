import {useRef, useEffect} from 'react'
import { TranslateMuscle } from '../../utils/muscle';

export default function SummaryCanvas({summaryData}){
    const canvasRef = useRef(null);

    

    useEffect(()=>{
        initCanvas()
        
    },[summaryData])

    function initCanvas(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            ctx.drawImage(img,0,0)
            muscleOutline()
            dataOverlay();
        }
        img.src = "/public/scaledbody.png";

        

    }

    // shapes defined as their x,y pos, as well as width and height
    const shapes = {
        "chest": {x:43,y:60,w:60,h:30},
        "shL": {x:23,y:60,w:20,h:20},
        "shR": {x:103,y:60,w:20,h:20},
        "biL": {x:25,y:80,w:18,h:35},
        "biR": {x:103,y:80,w:18,h:35},
        "quadL": {x:40,y:160,w:30,h:55},
        "quadR": {x:80,y:160,w:30,h:55},
        "back": {x:194,y:55,w:56,h:60},
        "hamL": {x:191,y:160,w:30,h:55},
        "hamR": {x:228,y:160,w:30,h:55},
        "triL": {x:177,y:77,w:18,h:40},
        "triR": {x:251,y:77,w:18,h:40},
    }

    // triceps then shoulders
    const muscle_group_shapes = [["chest"],["back"],["hamL","hamR"],["quadL","quadR"],["biL","biR"],["triL","triR"],["shL","shR"]]

    function strokeShape(ctx,shape){
        ctx.strokeRect(shape.x,shape.y,shape.w,shape.h)
    }
    function fillShape(ctx,shape,color="black"){
        ctx.fillStyle = color
        ctx.fillRect(shape.x+1,shape.y+1,shape.w-2,shape.h-2)
    }
    

    function muscleOutline(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        Object.keys(shapes).map((k)=>{strokeShape(ctx,shapes[k])})
        
    }

    function dataOverlay(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(summaryData && Object.keys(summaryData).length>1){
            const tot = summaryData.exercise_totals[0]; // only doing lifts rn
            summaryData.muscles[0].map((item,index)=>{
                console.log(`${item}, ${tot}`)
                const percent = Math.round((item/tot)*100);
                var color = "red";
                if(percent >= 50){
                    color="green"
                }
                else if(percent<50 & percent > 25){
                    color="yellow"
                }
                else{
                    color="red"
                }

                console.log(`Coloring ${TranslateMuscle(index)} : ${color} because of ${percent}`)

                muscle_group_shapes[index].map((item)=>{
                    fillShape(ctx,shapes[item],color)
                })
            })
        }
    }


    return (
        <div className='flex justify-center'>
            <canvas ref={canvasRef}  width={"300"} height={"300"} >Body Impact Canvas</canvas>
        </div>
        )
}