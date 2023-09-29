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
                <div className="mt-6 flex flex-col justify-text-start justify-items-end">

                    <div className='flex flex-row my-2'>
                        <p>Start</p>
                        <input type="date" className="ml-auto" onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
                    </div>
                    <div className='flex flex-row'>
                        <p>End</p>
                        <input type="date" className="ml-auto" onChange={(e)=>{setEndDate(e.target.valueAsNumber)}}></input>
                    </div>
                    
                    
                    <button className='button button-e-green' onClick={(GetWholeSummary)}>Generate</button>
                </div>
                <div className="flex flex-row">
                    <p>{new Date(startDate).toString().slice(0,15)}</p>
                    <p className='mx-3'>-</p>
                    <p>{endDate==0 ? "Right Now" : new Date(endDate).toString().slice(0,15)}</p>
                </div>
            </div>
    )
}