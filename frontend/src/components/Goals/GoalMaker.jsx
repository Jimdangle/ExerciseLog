import { TokenContext} from "../../views/Home"
import {useContext, useState} from 'react'

export default function GoalMaker({setGoal,setPage}){
    const token = useContext(TokenContext);
    const [startDate, setStartDate] = useState(Date.now()-(1000*60*60*24));
    const [endDate, setEndDate] = useState(Date.now()+ 7*60*60*24*1000);
    const [name,setName] = useState("");

    async function AddGoal(){
        try{
            const response = await fetch('http://localhost:3001/goals/new',{
                method: "POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({start:startDate,end:endDate,name:name})
            })

            if(response.ok){
                const bod = await response.json();
                
                setGoal(bod.baggage);
                setPage(3)
            
            }
        }
        catch(e)
        {
            console.error(e.message)
        }
    }

    return(<div  className="flex flex-col text-white">
        <button className="button button-e-blue w-24" onClick={()=>{setPage(0)}}>Return</button>
        <h1>Goals Maker</h1>
        <div className="flex justify-center">
            <input type="text" className="text-gun" placeholder="(name)" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        </div>
        <div className='flex flex-row my-2'>
            <p>Start</p>
            <input type="date" value={new Date(startDate).toISOString().split('T')[0]} className="ml-auto text-gun " onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
        </div>
        <div className='flex flex-row'>
            <p>End</p>
            <input type="date" value={new Date(endDate).toISOString().split('T')[0]} className="ml-auto text-gun" onChange={(e)=>{setEndDate(e.target.valueAsNumber)}}></input>
        </div>
        <div className="flex place-items-center justify-center">
            <button className="button button-e-blue" onClick={AddGoal}>Add</button>
        </div>

        </div>)
}