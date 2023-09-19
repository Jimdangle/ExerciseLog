import { TokenContext } from "../../views/Home"
import { useContext, useState } from "react"

export default function SetAdder({exercise_id}){
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
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(<>
        <div className="w-64 h-32 inline">
            <input className="inline mx-2" type="number" placeholder="reps or time" min={1} onChange={(v)=>{setReps(v.target.value)}}></input>
            <input className="inline mx-2" type="number" placeholder="additional weight" min={0} onChange={(v)=>{setWeight(v.target.value)}}></input>
            <button className='inline general-button scale-50' onClick={()=>{AddSet()}}>+</button>
        </div>
    </>)
}