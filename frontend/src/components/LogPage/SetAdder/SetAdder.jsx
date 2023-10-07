import { TokenContext } from "../../../views/Home"
import { useContext, useState } from "react"

export default function SetAdder({exercise_id, refresh, type}){
    const token = useContext(TokenContext);
    const [reps, setReps] = useState(1);
    const [weight, setWeight] = useState(0);
    
    const [time,setTime] = useState("00:00:00")
    const [cursor,setCursor] = useState(0);
    //                                     v              v             v              v                  v
    // take some string xx:yy:zz    xx:yy:zz        xx:yy:z1        xx:yy:10        xx:y1:01        xx:yy:01 
    function updateTime(event){// user types 1    types 0         types 1       types del 
        const key = event.key
        const skip_b = (cursor-2) % 3 == 0;
        
        const skip = 1

        console.log(cursor)
        if(key==="Backspace" || key==="Delete" && cursor > 0){
            
            setCursor(cursor-skip)
            console.log(`delete : ${cursor} `)
        }
        else if(((cursor % 3 == 0  && (Number(key) < 6)) || ((cursor-1 % 3 == 0) && Number(key) < 9)) && cursor < 7){
            setCursor(cursor+skip)
            console.log(`okay cursor ${cursor} : ${key}`)
        }
        
    }

    const rev = (str) =>{ return str.split("").reverse().join("") }


    function decrement(){
        
        
        
    }

    function increment(val){
        
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
                body:JSON.stringify({rep_or_time:reps, weight:weight, exercise_id:exercise_id})
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
            <input className="text-center rounded-lg text-gun w-24 my-2"  type="text" value={time} onKeyDown={(v)=>{
                updateTime(v)
            }}></input>
            }
            

           
            <input className="w-12 my-2 rounded-lg text-center text-gun" type="number" value={weight} placeholder="additional weight" min={"0"} max={"1000"} onChange={(v)=>{
                if(v.target.value >= 0 && v.target.value < 1000){
                    setWeight(v.target.value)
                }
            }}></input>
            
            

            
            <button className='w-8 h-8 rounded-full text-center hover:text-ogreen text-lg font-bold' onClick={()=>{AddSet()}}>+</button>
            
            
    </>)
}