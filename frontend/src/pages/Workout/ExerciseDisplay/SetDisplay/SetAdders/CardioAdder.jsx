import {useState, useEffect} from 'react'
import { timeToSec } from '../../../../../utility/time';
import NumberInput from '../../../../../components/forms/inputs/NumberInput';
export default function CardioAdder({addFetch}){
    const [newSet,setNewSet] = useState({rep_or_time:0,weight:0})
    const [time,setTime] = useState({h:0,m:0,s:0}); //state for our new set

    useEffect(()=>{
        setNewSet({...newSet,rep_or_time:timeToSec(time)})
    },[time])

    //updating functions
    const updateDistance = (event) => {setNewSet({...newSet,weight:event.target.value})}
    const updateTime = (event) => {
        const t = event.target
        if((Number(t.value) && Number(t.value) < 60 && Number(t.value) > -1) || t.value==="")
        {
            setTime({
                ...time,
                [t.name]: t.value
            })
        }   
    }

    return(
        <div>
            <div className='flex justify-between'>
                <div className='flex w-32'>
                    <NumberInput label="hh" styles="w-8" name="h" value={time.h} onChange={updateTime} />
                    :<NumberInput label="mm" styles="w-8" name="m" value={time.m} onChange={updateTime}/>
                    :<NumberInput label="ss" styles="w-8" name="s" value={time.s} onChange={updateTime}/>
                </div>
                <div>
                    <NumberInput label="Dist" name="weight" styles="w-8" value={newSet.weight} onChange={updateDistance}/>
                </div>
            
            </div>
        <button onClick={()=>{addFetch(newSet)}}>Add</button>
        </div>
    )

}