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

    const {data:goalData,loading:goalLoading,fetchData:goalFetch} = useRequest('/goals/new','p', {name:goal.name,start: new Date(goal.start), end: new Date(goal.end)})

    const handleEvent = (event) => {setGoal({...goal,[event.target.name]:event.target.value})}

    async function submit(){
        await goalFetch();
        
    }

    useEffect(()=>{
        console.log(goalData)
        if(goalData && goalData.baggage){
            goalStore.set(goalData.baggage._id); // set our goal id
            //setPage(3); // set our page to the goal view
        }
    },[goalData])
    
    return(
        <div className={`flex flex-col w-3/4 ml-[12.25%]`}>
            <TextInput name="name" value={goal.name} onChange={handleEvent} label="Name your Goal!" styles='text-gun'/>
            
        
            <DateInput name="start" value={goal.start} onChange={handleEvent} label="Start" styles='text-gun'/>
            <DateInput name="end" value={goal.end} onChange={handleEvent} label="End" styles='text-gun'/> 
            
            
            
            <button disabled={goalLoading} className='button button-e-blue disabled:button-d' onClick={async()=>{await submit()}}>Submit</button>
        </div>
               
    )
}