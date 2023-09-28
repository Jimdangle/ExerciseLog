import {useState, useContext} from 'react'




export default function SummarySettings({GetWholeSummary}){
    
    const [startDate,setStartDate] = useState(0)
    const [endDate,setEndDate] = useState(0)
    return (<div>
        <div className="mt-6 flex flex-row justify-text-startjustify-items-end">
                <p>Start</p>
                <input type="date" className="ml-2" onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
                <p>End</p>
                <input type="date" className="mr-2" onChange={(e)=>{setEndDate(e.target.valueAsNumber)}}></input>
                <button onClick={GetWholeSummary}>Click</button>
            </div>
            <div className="flex flex-row">
                <p>{new Date(startDate).toString()}</p>
                <p>{new Date(endDate).toString()}</p>
            </div>
    </div>)
}