import { TokenContext } from "../../../views/Home"
import { useContext, useState, useEffect } from "react"


export default function SetAdder({exercise_id, refresh, type, nextNum}){
    const token = useContext(TokenContext);
    const [reps, setReps] = useState(1);
    const [weight, setWeight] = useState(0);
    
    const [time,setTime] = useState({hours:"",min:"",sec:""})

    

    function updateTime(event){
        const t = event.target;
        console.log(t.value)
        console.log(t.value== "")
        if((Number(t.value) && Number(t.value) < 60 && Number(t.value) > -1) || t.value===""){
        setTime({
            ...time,
            [t.name]: t.value
        })
        }

    }

    function timeToSec(){
        const h = time.hours ? time.hours : 0
        const m = time.min ? time.min : 0
        const s = time.sec ? time.sec : 0
        return Number((h*60*60)) + Number((m*60)) + Number(s)
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
                body:JSON.stringify({rep_or_time:(type===0? reps : timeToSec()), weight:weight, exercise_id:exercise_id})
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

    return(
    <div className="grid grid-cols-4">
            <p className="str-gun">{nextNum+1}</p>
            {type === 0 ?
            <input className="text-center place-self-center rounded-lg text-gun w-12 my-2" type="number" value={reps} placeholder="reps or time" min={"1"} onChange={(v)=>{
                if(v.target.value >= 0){
                    setReps(v.target.value)}
                }
            }></input>
            :
            <div className="flex flex-row place-self-center">
                <input className="number w-8" name="hours" placeholder="hh" onChange={(e)=>{updateTime(e)}} value={time['hours']}></input>:
                <input className="number w-8" name="min" placeholder="mm" onChange={(e)=>{updateTime(e)}} value={time['min']}></input>:
                <input className="number w-8" name="sec" placeholder="ss" onChange={(e)=>{updateTime(e)}} value={time['sec']}></input>
            </div>
            }
            

           
            <input className="w-12 my-2 place-self-center rounded-lg text-center text-gun" type="number" value={weight} placeholder={type==0 ? "Weight" : "Dist"} min={"0"} max={"1000"} onChange={(v)=>{
                if(v.target.value >= 0 && v.target.value < 1000){
                    setWeight(v.target.value)
                }
            }}></input>
            
            

            
            <button className='w-8 h-8 place-self-center rounded-full text-center text-ogreen text-lg font-bold' onClick={()=>{AddSet()}}>+</button>
            
            
    </div>)
}