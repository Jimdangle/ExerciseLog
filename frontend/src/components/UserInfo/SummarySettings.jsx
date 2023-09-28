import {useState, useContext} from 'react'
import { TokenContext } from '../../views/Home'




export default function SummarySettings({update}){
    const [startDate,setStartDate] = useState(0)
    const [endDate,setEndDate] = useState(0)
    
    const token = useContext(TokenContext);
    async function GetWholeSummary(){
        try{
            const response = await fetch('http://localhost:3001/user/wsum',{
                method:"POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token,
                    'Accept': '*/*'
                },
                mode:'cors',
                body: JSON.stringify({start:startDate,end:endDate})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                update(bod.summary);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    

    return (<div>
        <div className="mt-6 flex flex-row justify-text-startjustify-items-end">
                <p>Start</p>
                <input type="date" className="ml-2" onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
                <p>End</p>
                <input type="date" className="mr-2" onChange={(e)=>{setEndDate(e.target.valueAsNumber)}}></input>
                <button onClick={(GetWholeSummary)}>Click</button>
            </div>
            <div className="flex flex-row">
                <p>{new Date(startDate).toString()}</p>
                <p>{new Date(endDate).toString()}</p>
            </div>
    </div>)
}