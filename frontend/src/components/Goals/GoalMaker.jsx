import { TokenContext} from "../../views/Home"
import {useContext, useState} from 'react'

export default function GoalMaker(){
    const token = useContext(TokenContext);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(Date.now());
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
                console.log(bod);
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    return(<div  className="flex flex-col text-white">
        <h1>Goals Maker</h1>
        <div className="flex justify-center">
            <input type="text" className="text-black" placeholder="(name)" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        </div>
        <div className='flex flex-row my-2'>
            <p>Start</p>
            <input type="date" placeholder={startDate.toString()} className="ml-auto text-black " onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
        </div>
        <div className='flex flex-row'>
            <p>End</p>
            <input type="date" placeholder={endDate.toString()} className="ml-auto text-black" onChange={(e)=>{setEndDate(e.target.valueAsNumber)}}></input>
        </div>
        <div className="flex place-items-center justify-center">
            <button className="button button-e-blue" onClick={AddGoal}>Add</button>
        </div>

        </div>)
}