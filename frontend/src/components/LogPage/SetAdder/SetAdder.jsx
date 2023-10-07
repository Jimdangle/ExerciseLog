import { TokenContext } from "../../../views/Home"
import { useContext, useState, useEffect } from "react"


export default function SetAdder({exercise_id, refresh, type}){
    const token = useContext(TokenContext);
    const [reps, setReps] = useState(1);
    const [weight, setWeight] = useState(0);
    
    const [time,setTime] = useState({hours:0,min:0,sec:0})

    useEffect(()=>{console.log(time)},[time])

    function updateTime(event){
        const t = event.target;
        if(Number(t.value) && Number(t.value) < 60 && Number(t.value) > -1){
        setTime({
            ...time,
            [t.name]: t.value
        })
        }

    }

    function timeToSec(){
        return Number((time.hours*60*60)) + Number((time.min*60)) + Number(time.sec)
    }

    async function AddSet(){
        console.log(JSON.stringify({rep_or_time:reps, weight:weight, exercise_id:exercise_id}))
        try{
            const response = await fetch('http://localhost:3001/workout/addSet',{
                method:"post",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body:JSON.stringify({rep_or_time:(type===0? rep_or_time : timeToSec()), weight:weight, exercise_id:exercise_id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                //setReps(1); Resetting the rep and weight is a preference idk which way i like more 
                //setWeight(0);
                refresh()
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(<>
            <p className="str-gun">New Set</p>
            {type === 0 ?
            <input className="text-center rounded-lg text-gun w-12 my-2" type="number" value={reps} placeholder="reps or time" min={"1"} onChange={(v)=>{
                if(v.target.value >= 0){
                    setReps(v.target.value)}
                }
            }></input>
            :
            <div className="flex flex-row">
                <input className="number w-8" name="hours" placeholder="hh" onChange={(e)=>{updateTime(e)}} value={time['hours']}></input>:
                <input className="number w-8" name="min" placeholder="mm" onChange={(e)=>{updateTime(e)}} value={time['min']}></input>:
                <input className="number w-8" name="sec" placeholder="ss" onChange={(e)=>{updateTime(e)}} value={time['sec']}></input>
            </div>
            }
            

           
            <input className="w-12 my-2 rounded-lg text-center text-gun" type="number" value={weight} placeholder="additional weight" min={"0"} max={"1000"} onChange={(v)=>{
                if(v.target.value >= 0 && v.target.value < 1000){
                    setWeight(v.target.value)
                }
            }}></input>
            
            

            
            <button className='w-8 h-8 rounded-full text-center hover:text-ogreen text-lg font-bold' onClick={()=>{AddSet()}}>+</button>
            
            
    </>)
}