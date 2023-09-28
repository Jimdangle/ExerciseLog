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
        <div className='w-auto h-auto mx-2 my-2 bg-blue-200 rounded-lg pb-2'>
            
            <div className='flex flex-row'>
                <button className='w-12 h-12 rounded-full bg-red-200 scale-50 text-3xl' onClick={()=>{RemoveExercise(item._id)}}>-</button> 
                <p className='justify-center my-3 w-auto h-24 font-semibold'>{motionData.name}</p>
                <div className='ml-auto mr-5'>
                    <p className='text-lg text-slate-900'>{motionData.muscles? SortedMuscleIndex(motionData.muscles).map((item,index)=>{return <span key={index} className='text-sm mr-1'>{ motionData.muscles[item]>=0.1 ? TranslateMuscle(item)+"," : <></>}</span>}) : <></>}</p>
                    <p className='text-lg'>{TranslateType(motionData.type)}</p>
                </div>
            </div>
           
            <div className='h-auto w-auto -mt-12 bg-slate-100 mx-2 rounded-md shadow-sm'>
                <div className='grid grid-cols-4 place-items-center'>
                    <div className='text-sm font-semibold text-slate-600'>Set #</div> 
                    <div className='text-sm font-semibold text-slate-600'>Rep/Time</div>
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
        </div>
        )
    
}