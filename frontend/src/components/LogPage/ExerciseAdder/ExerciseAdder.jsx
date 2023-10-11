import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../../../views/Home";
import MotionAdder from "./MotionAdder";
// Create a dropdown list from the motions stored on the db

export default function ExerciseAdder({workout_id, complete}){
    const token = useContext(TokenContext);
    useEffect(()=>{GetMotions()},[])

    const [motions, setMotions] = useState([])
    const [displayMotions, setDisplayMotions] = useState([]);

    const [addingNew, setAddingNew] = useState(false);

    function searchMotions(search){
        console.log(`Searching: ${search}`)
        var moti = motions;
        var searched = moti.filter( (motion) =>  motion.name.toLowerCase().indexOf(search.toLowerCase()) !=-1 );
        console.log(searched);
        setDisplayMotions(searched);
    }

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
                setDisplayMotions(bod.motions);
            }
        }
        catch(e){
            console.log(e)
        }
    }

    async function AddExerciseToLog(motion_id){
        try{
            const response = await fetch('http://localhost:3001/workout/addEx', {
                method: 'POST',
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({
                    motion_id:motion_id,
                    workout_id:workout_id
                })
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                complete();
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(<>
        <div className="lg:w-96 max-md:w-124 h-124 bg-white rounded-md overflow-scroll">
            
            {addingNew ? <MotionAdder update={setAddingNew} refresh={GetMotions}></MotionAdder> : <></>}
            <h1 className="font-semibold ml-3">Select a motion</h1>
            <input type="text" className="px-2 mx-2" placeholder="search" onChange={(val)=>{searchMotions(val.target.value)}}></input>
            <p className="inline text-slate-500">{displayMotions.length}</p>
            <button className="px-4 mx-1 inline button button-e-blue scale-70 text-black" onClick={()=>{setAddingNew(true)}}>Add New</button>
            {
                motions ? 
                displayMotions.map((item,index)=>{
                    
                    return (
                        <button key={index} className="px-4 mx-1 border-2 inline button h-auto scale-70" onClick={()=>{AddExerciseToLog(item._id)}}>{item.name}</button>
                    )
                })
                :
                <></>
            }
        </div>
    </>)
}