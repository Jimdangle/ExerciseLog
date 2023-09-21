import SetAdder from '../SetAdder/SetAdder';
import SetItem from './SetItem';
import { TranslateMuscle } from '../../utils/muscle';

export default function ExerciseItem({item, RemoveExercise, RemoveSet, refresh}){

    return (
        <div className='w-auto h-auto mx-2 my-2 bg-slate-100 rounded-lg pb-2'>
            
            <div className='flex flex-row'>
                <button className='w-12 h-12 rounded-full bg-red-200 scale-50 text-3xl' onClick={()=>{RemoveExercise(item._id)}}>-</button> 
                <p className='justify-center my-3 w-auto h-24 font-semibold'>{item.motion.name}</p>
                <div className='ml-auto mr-5'>
                    <p className='text-lg text-slate-900'>{TranslateMuscle(item.motion.p_group)}</p>
                    <ul>
                        {item.motion.s_groups.map( (item,index) => {
                            return (<li key={index*900} className='text-slate-500'>{TranslateMuscle(item)}</li>)
                        })}
                    </ul>
                </div>
            </div>
           
            <div className='h-auto w-auto -mt-12 bg-blue-200 mx-2 rounded-md shadow-sm'>
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