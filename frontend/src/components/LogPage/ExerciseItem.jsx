import SetAdder from './SetAdder/SetAdder';
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
        //console.log(`original:${data}\n\tnonZero:${nonZero}-${nonZero.map((item)=>{return TranslateMuscle(item)})}\n\tsorted:${sorted}-${sorted.map((item)=>{return TranslateMuscle(item)})}`);
        return sorted;

    }


    return (
        // Main container card for exercise
        <div className='my-1'>
            
            {/** Main info about the exercise, name, type, and the muscles it impacts */}
            <div className='flex flex-row'>
                <p className='justify-center m-3 w-auto h-24 h2-white'>{motionData.name}(<span className=' text-oblue'>{TranslateType(motionData.type)}</span>)</p>
                <div className='ml-auto mr-5 mt-3'>
                    <p className='info-blue-s'>{motionData.muscles? SortedMuscleIndex(motionData.muscles).map((item,index)=>{return <span key={index} className={'text-sm ml-2'}>{ motionData.muscles[item]>=0.2 ? TranslateMuscle(item) : <></>}</span>}) : <></>}</p>
                </div>
            </div>
           
           {/**Container for the sets, and set adder component */}
            <div className='h-auto w-auto -mt-12 mx-1 workout-item'>
                <div className='grid grid-cols-4 place-items-center text-oblue'>
                    <div className='str-gun'>Set #</div> 
                    <div className='str-gun'>{motionData.type==0 ? "Reps" : "Time"}</div>
                    <div className='str-gun'>{motionData.type==0 ? "Weight(lbs)" : "Distance(mi)"}</div>
                    <div></div>       
                </div>
                <div>
                    {
                        item.sets ? 
                        item.sets.map( (set, subindex) => {
                            return(
                                <SetItem set={set} key={subindex} number={subindex+1} RemoveSet={RemoveSet} exercise_id={item._id} type={motionData.type}></SetItem>)
                        })
                        :
                        <></>
                    }
                    
                    <SetAdder exercise_id={item._id} refresh={refresh} type={motionData.type} nextNum={item.sets.length}></SetAdder>
                </div>
            </div>
            <div className='flex justify-center'>
             <button className='button button-e-red' onClick={()=>{RemoveExercise(item._id)}}>Remove</button>
            </div>
            
        </div>
        )
    
}