import {useState} from 'react'
import { timeToSec } from '../../../../../utility/time';
import NumberInput from '../../../../../components/forms/inputs/NumberInput';
export default function CardioAdder({addFetch}){
    const [newSet,setNewSet] = useState({rep_or_time:0,weight:0})
    const [time,setTime] = useState({h:0,m:0,s:0}); //state for our new set


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
            setNewSet({...newSet,rep_or_time:timeToSec(time)})
        }   
    }

    return(
        <div>
            <div className='flex'>
                <NumberInput styles="w-12" name="h" value={time.h} onChange={updateTime} />
                <NumberInput styles="w-12" name="m" value={time.m} onChange={updateTime}/>
                <NumberInput styles="w-12" name="s" value={time.s} onChange={updateTime}/>
            </div>
            <div>
                <NumberInput name="weight" value={newSet.weight} onChange={updateDistance}/>
            </div>
            <button onClick={()=>{addFetch(newSet)}}>Add</button>
        </div>
    )

}