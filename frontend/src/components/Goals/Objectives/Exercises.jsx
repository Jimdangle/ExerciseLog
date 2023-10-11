import { TokenContext } from "../../../views/Home";
import {useContext, useState, useEffect} from 'react'

export default function Exercise({setTarget}){

    const token = useContext(TokenContext)
    const [motions,setMotions] = useState([])
    const [search,setSearch] = useState("")
    const [motionName, setMotionName] = useState("")
    const [subTarget, setSubTarget] = useState("")
    const [type,setType] = useState(0)
    useEffect(()=>{
        GetMotions();
        setTarget({exercise_name:"",subTarget:"",type:0})
    },[])



    useEffect(()=>{
        setTarget({exercise_name:motionName,subTarget:subTarget,type:type})
    },[motionName,subTarget])

    async function GetMotions(){
        try{
            const response = await fetch('http://localhost:3001/motion/lsa', {
                method: "GET",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',

            })

            const bod = await response.json();
            if(response.ok){
                console.log(bod.motions)
                setMotions(bod.motions)
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <div className="text-white">
            {motionName === "" ?
            <div>
                <input type="text" value={search} placeholder="search" onChange={(e)=>{setSearch(e.target.value)}}></input>
                {motions.filter( (motion) => { return ((motion.name.toLowerCase()).indexOf(search.toLowerCase()) != -1 ) }).map((item,index) => {
                    return <button className="px-4 mx-1 border-2 inline button h-auto scale-70" onClick={()=>{setMotionName(item.name); setType(item.type)}}>{item.name}</button>
                })}
            </div>
            :
            <div>
                <p onClick={()=>{setMotionName("")}}>Motion: {motionName}</p>
            </div>}

            <div className="flex flex-row">
                <p>Option: </p>
                <select name="volume_select" className="bg-slate-600" onChange={(e)=>{setSubTarget(e.target.value)}}>
                            <option value="n">Sets</option>
                            <option value="r,min">{type===0 ? "Rep" : "Time"} Min</option>
                            <option value="r,max">{type===0 ? "Rep" : "Time"} Max</option>
                            <option value="r,avg">{type===0 ? "Rep" : "Time"} Average</option>
                            <option value="w,min">{type===0 ? "Weight" : "Dist"} Min</option>
                            <option value="w,max">{type===0 ? "Weight" : "Dist"} Max</option>
                            <option value="w,avg">{type===0 ? "Weight" : "Dist"} Average</option>
                </select>  
            </div>
        </div>
    
    )
}