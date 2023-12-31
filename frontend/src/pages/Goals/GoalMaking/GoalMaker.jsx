import TextInput from '../../../components/forms/inputs/TextInput'
import DateInput from '../../../components/forms/inputs/DateInput'
import SliderInput from '../../../components/forms/inputs/SliderInput'
import {useRequest} from '../../../hooks/requests/useRequest'
import { goalStore } from '../../../utility/storage'
import {PageContext} from'../../PageSelector/index'

import {useState, useContext,useEffect} from 'react'
export default function GoalMaker({}){
    const today = new Date()
    const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const tomorrowString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`

    const [goal,setGoal] = useState({name:'',start:todayString,end:tomorrowString})

    const setPage = useContext(PageContext)

    const {data:goalData,loading:goalLoading,fetchData:goalFetch} = useRequest('/goals/new','p', {name:goal.name,start: fixTimeValue(goal.start), end: fixTimeValue(goal.end)})

    const handleEvent = (event) => {
        const {name, value} = event.target;
        setGoal({...goal,[name]:value})
    }

    async function submit(){
        await goalFetch();
        
    }

    // Take in a string YYYY-MM-DD and add in our users current hours/min/seconds and return it as a date object
    function fixTimeValue(timeString){
        const parts = timeString.split("-")
        const time = new Date(Date.now())
        time.setMonth(parts[1]-1) // love this lol yea so november = month 10 btw
        time.setDate(parts[2]) // why not continue the pattern and have 10/0/2023 be november 1 2023???? idk just do it for months that makes more sense
        time.setFullYear(parts[0])
        return time

    }

    console.log(fixTimeValue(goal.start).toISOString(), " end: " ,fixTimeValue(goal.end).toISOString())
    

    useEffect(()=>{
        if(goalData && goalData.baggage){
            goalStore.set(goalData.baggage._id); // set our goal id
            setPage(3); // set our page to the goal view
        }
    },[goalData])
    
    return(
        <div className={`flex flex-col w-3/4 ml-[12.25%]`}>
            <TextInput name="name" value={goal.name} onChange={handleEvent} label="Name your Goal!" styles='text-gun'/>
            
        
            <DateInput name="start" value={goal.start} min={todayString} onChange={handleEvent} label="Start" styles='text-gun'/>
            <DateInput name="end" value={goal.end}  min={tomorrowString} onChange={handleEvent} label="End" styles='text-gun'/> 
            
            
            
            <button disabled={goalLoading} className='button button-e-blue disabled:button-d' onClick={async()=>{await submit()}}>Submit</button>
        </div>
               
    )
}