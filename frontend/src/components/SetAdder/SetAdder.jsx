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
            <button className='inline general-button scale-50 col-span-2 col-start-2' onClick={()=>{AddSet()}}>+</button>
    </>)
}