import {useEffect, useState} from 'react'

import ExerciseAdder from '../ExerciseAdder/ExerciseAdder';

export default function LogPage({item, SelectPage, token}){
    
    
    useEffect(()=>{GetWorkoutInfo()}, []);

    async function GetWorkoutInfo(){
        try{
            const response = await fetch('http://localhost:3001/workout/get',{
            method: "POST",
            headers: {
                'Origin': 'http://127.0.0.1:3000',
                'Content-Type': 'application/json',
                'authorization': token
            },
            mode:'cors',
            body: JSON.stringify( {workout_id:item})
            });
    
            const bod = await response.json();
            if(response.ok)
            {
                setLogData(bod.workout);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    
    const [logData, setLogData] = useState({})
    const [addingExercise, setAddingExercise] = useState(false);

    return (<>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 p-2 bg-blue-300">
            <h2>{logData.name}</h2>
            {
                logData.exercises ? 
                    logData.exercises.map((item, index) =>{
                        return (
                            <p key={index}>Exercise: {item}</p>
                        )
                    })
                    :
                    <p>No Exercises</p>
                
            }
            <button className='general-button' onClick={()=>{var t = addingExercise; setAddingExercise(!t);}}>{addingExercise ?  "Cancel" : "Add Exercise" }</button>
            {addingExercise ? <ExerciseAdder workout_id={item}></ExerciseAdder> : <></>}
            <button className='my-2 absolute top-3/4 left-1/2 -translate-x-1/2 translate-y-10 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={()=>{SelectPage({})}}>Return</button>
            </div>
        </>)
        
}
