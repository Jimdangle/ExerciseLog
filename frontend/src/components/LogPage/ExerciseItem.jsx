import SetAdder from '../SetAdder/SetAdder';
import SetItem from './SetItem';
import { TranslateMuscle, TranslateType } from '../../utils/muscle';
import {useEffect, useState} from 'react'

export default function ExerciseItem({item, RemoveExercise, RemoveSet, refresh}){
    const [motionData, setMotionData] = useState({});
   
    
    const init = item.motion.motion ? item.motion.motion : item.motion.umotion; // handle differences between user motions and server motions
    useEffect(()=>{
        setMotionData(init);
    },[])
  
    function SortedMuscleIndex(data){
        var nonZero = Object.keys(data).filter((item)=>{return data[item]>0.0}) // return indexes that are non zero
        var sorted = nonZero.sort((a,b)=>{return (data[a]<data[b] ? 1 : -1)});
        console.log(`original:${data}\n\tnonZero:${nonZero}-${nonZero.map((item)=>{return TranslateMuscle(item)})}\n\tsorted:${sorted}-${sorted.map((item)=>{return TranslateMuscle(item)})}`);
        return sorted;

    }


    return (
        // Main container blue background card for exercise
        <div className='w-auto h-auto m-2 bg-blue-200 rounded-lg pb-2'>
            
            {/** Main info about the exercise, name, type, and the muscles it impacts */}
            <div className='flex flex-row'>
                <p className='justify-center m-3 w-auto h-24 text-xl font-semibold'>{motionData.name}<span className='px-2 text-slate-600'>({TranslateType(motionData.type)})</span></p>
                <div className='ml-auto mr-5'>
                    <p className='text-lg text-slate-900'>{motionData.muscles? SortedMuscleIndex(motionData.muscles).map((item,index)=>{return <span key={index} className='text-sm mr-1'>{ motionData.muscles[item]>=0.1 ? TranslateMuscle(item)+"," : <></>}</span>}) : <></>}</p>
                    
                </div>
            </div>
           
           {/**Container for the sets, and set adder component */}
            <div className='h-auto w-auto -mt-12 bg-slate-100 mx-2 rounded-md shadow-sm'>
                <div className='grid grid-cols-4 place-items-center'>
                    <div className='text-sm font-semibold text-slate-600'>Set #</div> 
                    <div className='text-sm font-semibold text-slate-600'>{motionData.type==0 ? "Reps" : "Time(s)"}</div>
                    <div className='text-sm font-semibold text-slate-600'>Weight(lbs)</div>
                    <div></div>       
                
                    {
                        item.sets ? 
                        item.sets.map( (set, subindex) => {
                            return(
                                <SetItem set={set} key={subindex} number={subindex+1} RemoveSet={RemoveSet} exercise_id={item._id}></SetItem>)
                        })
                        :
                        <></>
                    }
                    
                    <SetAdder exercise_id={item._id} refresh={refresh}></SetAdder>
                </div>
            </div>
            <button className='rounded-md h-10 m-2 p-2 bg-red-400 focus:scale-90 duration-75 hover:bg-red-200 text-white' onClick={()=>{RemoveExercise(item._id)}}>Remove</button>
        </div>
        )
    
}