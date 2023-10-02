import {useRef, useEffect} from 'react'
import { TranslateMuscle } from '../../utils/muscle';

export default function SummaryCanvas({summaryData,overlay}){
    const canvasRef = useRef(null);
    
    useEffect(()=>{console.log(summaryData)},[])
    
    useEffect(()=>{
        initCanvas()
        
    },[summaryData,overlay])
    
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
        img.src = "/scaledbody.png";
        
        
        
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
    
    function getColorFromZ(score){
        if(!score|| score<=0){
            return "blue";
        }
        else if(score<=1){ // good use range
            return "green";
        }
        else{ // over used
            return "red";
        }
    }

    function zScore(val,std,avg){
        return (val-std)/avg // # of stdevs away from mean        
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
            
            
            //Get average and stdevations for each overlay
            //3 averages
            
            const avgs = summaryData.muscles.map( (muscle_map) => {return muscle_map.reduce((t,v)=>{return t+v},0)/muscle_map.length})
            //3 standard deviations
            var stdevs = summaryData.muscles.map( (muscle_map,index) => {return (muscle_map.reduce((t,v)=>{return t+((v-avgs[index])*(v-avgs[index]))},0)/(muscle_map.length-1))})
            
            
            // dirty total calculation, iterate over each muscle map while going over the first one and add them all together (they should all be same length)
            const totals = summaryData.muscles[0].map((muscle,index)=>{
                return muscle+summaryData.muscles[1][index]+summaryData.muscles[2][index]
            })
            
            const t_avg = totals.reduce((t,v)=>{return t+v},0)/totals.length; // average for the totals 
            var t_stdev = totals.reduce((t,v)=>{return t+((v-t_avg)*(v-t_avg))},0)/(totals.length-1)
            t_stdev = Math.sqrt(t_stdev);
            
            
            
            
            
            const muscles = summaryData.muscles;
            //all the values
            const all_avgs = [...avgs,t_avg]
            const all_stds = [...stdevs,t_stdev]
            const all_muscles = [...muscles,totals]
            
            //using our all_stds list map over each value
            all_stds.map((stdev, index)=> {
                if(overlay==4 || (index==overlay)){ // if we are generating the total
                    all_muscles[index].map((muscle,subindex)=>{
                        const z = zScore(muscle,all_avgs[index],stdev);
                        muscle_group_shapes[subindex].map((shape_key)=>{
                            fillShape(ctx,shapes[shape_key],getColorFromZ(z))
                        })
                    })
                }
            })
            
        }
    }
    
    
    return (
        <div className='flex justify-center'>
            <canvas ref={canvasRef}  width={"300"} height={"300"} >Body Impact Canvas</canvas>
        </div>
        )
    }