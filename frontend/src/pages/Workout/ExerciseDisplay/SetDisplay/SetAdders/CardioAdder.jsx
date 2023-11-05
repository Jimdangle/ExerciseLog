import {useState, useEffect} from 'react'
import { timeToSec } from '../../../../../utility/time';
import NumberInput from '../../../../../components/forms/inputs/NumberInput';
import IncrementalInput from '../../../../../components/forms/inputs/IncrementalInput';
export default function CardioAdder({addFetch}){
    const [newSet,setNewSet] = useState({rep_or_time:0,weight:0})
    const [time,setTime] = useState({h:0,m:0,s:0}); //state for our new set

    useEffect(()=>{
        setNewSet({...newSet,rep_or_time:timeToSec(time)})
        console.log(time)
    },[time])

    //updating functions
    const updateDistance = (event) => {setNewSet({...newSet,weight:event.target.value})}
    const updateTime = (event) => {
        const t = event.target
        if((Number(t.value)!==null && Number(t.value) < 60 && Number(t.value) > -1) || t.value==="")
        {
            setTime({
                ...time,
                [t.name]: t.value
            })
        }   
    }

    //
    const timeTransform = (string) => {
        const out = string.padStart(2,'0')
        return out;
    }

    

    return(
        <div>
            <div className='flex flex-col justify-between mx-2'>
                <div className='flex relative justify-between w-3/4 left-[12.5%]'>
                    <IncrementalInput label="HH" name="h" value={time.h} valueTransform={timeTransform} step={1} min={0} max={24} onChange={updateTime} />
                    :<IncrementalInput label="MM" name="m" value={time.m} valueTransform={timeTransform} onChange={updateTime} step={5} max={60} min={0}/>
                    :<IncrementalInput label="SS" name="s" value={time.s} valueTransform={timeTransform} onChange={updateTime} step={15} max={60} min={0}/>
                </div>
                <div>
                    <IncrementalInput  step={0.5} min={0} max={100} label="Distance" name="weight" styles="w-8" value={newSet.weight} onChange={updateDistance}/>
                </div>
                
            </div>
            <div className='flex justify-center'>
                <button className='button button-e-blue' onClick={()=>{addFetch(newSet)}}>Add</button>
            </div>
        
        </div>
    )

}