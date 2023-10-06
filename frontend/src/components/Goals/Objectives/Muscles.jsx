import {useState, useEffect} from 'react'
export default function Muscles({setTarget}){
    const [muscle, setMuscle] = useState(0)
    const [type, setType] = useState(0)

    useEffect( ()=> {
        setTarget({muscle:muscle,type:type})
    },[type,muscle])

    return(
    <div className="flex flex-col text-white my-2">
        <div className="flex flex-row">
            <p>Muscle: </p>
            <select name="volume_select" className=" bg-slate-600" onChange={(e)=>{setMuscle(e.target.value)}}>
                        <option value="0">Chest</option>
                        <option value="1">Back</option>
                        <option value="2">Hamstrings</option>
                        <option value="3">Quads</option>
                        <option value="4">Biceps</option>
                        <option value="5">Triceps</option>
                        <option value="6">Shoulders</option>
            </select> 
        </div>
        
        <div className="flex flex-row">
            <p>Type: </p>
            <select name="volume_select" className=" bg-slate-600" onChange={(e)=>{setType(e.target.value)}}>
                        <option value="0">Lifts</option>
                        <option value="1">Cardio</option>
                        <option value="2">Holds</option>
            </select>  
        </div>
         
    </div>)
}