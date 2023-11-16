import TextInput from '../../../components/forms/inputs/TextInput'
import DateInput from '../../../components/forms/inputs/DateInput'
import SliderInput from '../../../components/forms/inputs/SliderInput'

import {useState} from 'react'
export default function GoalMaker({}){
    const [goal,setGoal] = useState({name:'',start:null,end:null})
    const handleEvent = (event) => {setGoal({...goal,[event.target.name]:event.target.value})}
    return(
        <div>
            <TextInput name="name" value={goal.name} onChange={handleEvent} label="Name your Goal!"/>
            <DateInput name="start" value={goal.start} onChange={handleEvent} label="Starting Date"/> 
            <DateInput name="start" value={goal.end} onChange={handleEvent} label="Ending Date"/> 
        </div>
               
    )
}