import { TokenContext } from "../../views/Home"
import { useContext, useState } from "react"

export default function SetAdder({exercise_id, refresh}){
    const token = useContext(TokenContext);
    const [reps, setReps] = useState(1);
    const [weight, setWeight] = useState(0);

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
                setReps(1);
                setWeight(0);
                refresh()
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(<>
            <p className="">Reps</p>
            <div></div>
            <input className="mr-10 my-2" type="number" value={reps} placeholder="reps or time" min={1} onChange={(v)=>{setReps(v.target.value)}}></input>
            <div></div>
            <p>Weight</p>
            <div></div>
            <input className="mr-10 my-2" type="number" value={weight} placeholder="additional weight" min={0} onChange={(v)=>{setWeight(v.target.value)}}></input>
            <div></div>
            
            <button className='w-12 col-start-3  h-12 rounded-full bg-green-200 scale-50 text-3xl' onClick={()=>{AddSet()}}>+</button>
            
            
    </>)
}