import {useRef, useEffect} from 'react'
import { TranslateMuscle } from '../../utils/muscle';

export default function SummaryCanvas({summaryData}){
    const canvasRef = useRef(null);

    

    useEffect(()=>{
        initCanvas()
        
    },[summaryData])

    // Initialize our canvas by drawing the image on it
    function initCanvas(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => { // once our image is loaded perform these function calls 
            ctx.drawImage(img,0,0)
            muscleOutline()
            dataOverlay();
        }
        img.src = "/public/scaledbody.png";

        

    }

    // shapes defined as their x,y pos, as well as width and height (these are used for the outline and fill)
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

    // This maps the muscle group indexes to the muscle shapes
    const muscle_group_shapes = [["chest"],["back"],["hamL","hamR"],["quadL","quadR"],["biL","biR"],["triL","triR"],["shL","shR"]]

    // draw a given shape
    function strokeShape(ctx,shape){
        ctx.strokeRect(shape.x,shape.y,shape.w,shape.h)
    }
    // fill in a shape (but move it and shrink a touch so we don't cover the outline)
    function fillShape(ctx,shape,color="black"){
        ctx.fillStyle = color
        ctx.fillRect(shape.x+1,shape.y+1,shape.w-2,shape.h-2)
    }
    
    // Go over all of our options and draw them
    function muscleOutline(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        Object.keys(shapes).map((k)=>{strokeShape(ctx,shapes[k])})
        
    }

    // Use summary data to project correct color on to map
    function dataOverlay(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        //ensure we have summary data to do things with
        if(summaryData && Object.keys(summaryData).length>1){
            const tot = summaryData.exercise_totals[0]; // only showing lift impact

            //average and stdev
            const avg = summaryData.muscles[0].reduce((t,v)=>{return t+v},0)/summaryData.muscles[0].length;
            const pre_stdev = summaryData.muscles[0].reduce((t,v)=>{return t+((v-avg)*(v-avg))},0)/summaryData.muscles[0].length-1;
            const stdev = Math.sqrt(pre_stdev);

            const std_scores = summaryData.muscles[0].map((item,index)=>{
                const zeta = Math.abs((item-stdev)/avg) // # of stdevs away from mean
                console.log(`${item} : ${zeta}`)
                return zeta;
            })
            // for each item in our summary data impact map (calculate the total percentage, and then designate a color)
            std_scores.map((item,index)=>{
                console.log(`${item}, ${tot}`)
                const percent = Math.round((item/tot)*100);
                var color = "red";
                if(item<=1){
                    color="green"
                }
                else if(item>1 && item <2){
                    color="yellow"
                }
                else{
                    color="red"
                }

                console.log(`Coloring ${TranslateMuscle(index)} : ${color} because of ${item}`)
                //Iterate over the shapes for the muscle we are at and fill them in
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