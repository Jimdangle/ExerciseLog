import {useEffect, useState} from 'react'

import ExerciseAdder from '../ExerciseAdder/ExerciseAdder';
import SetAdder from '../SetAdder/SetAdder';

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

    function AddedExercise(){
        setAddingExercise(false);
        GetWorkoutInfo();
    }

    async function RemoveExercise(exercise_id){
        try{
            const response = await fetch('http://localhost:3001/workout/remEx',{
                method:"DELETE",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body:JSON.stringify({workout_id:item,exercise_id:exercise_id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                GetWorkoutInfo();
            }
        }
        catch(e){
            console.log(e)
        }
    }

    async function RemoveSet(exercise_id,set_id){
        try{
            const response = await fetch('http://localhost:3001/workout/remSet',{
                method:"DELETE",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body:JSON.stringify({exercise_id:exercise_id, set_id:set_id})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                GetWorkoutInfo();
            }
        }
        catch(e){
            console.log(e)
        }
    }


    return (<>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 p-2 bg-blue-300 overflow-scroll">
            <h2>{logData.name}</h2>
            {console.log(logData.exercises)}
            {
                
                logData.exercises ? 
                    logData.exercises.map((item, index) =>{
                        return (
                           <div key={index}>
                            <button className='inline general-button scale-50' onClick={()=>{RemoveExercise(item._id)}}>-</button>
                            <p className='inline'>{item.motion.name}</p>
                            
                            {
                                item.sets ? 
                                item.sets.map( (set, subindex) => {
                                    return(
                                        <div className="relative left-10" key={index+subindex*100}>
                                            <button className='inline general-button scale-50' onClick={()=>{RemoveSet(item._id,set._id) }}>-</button>
                                            <p className='inline'>Reps/Time:{set.rep_or_time}, Weight:{set.added_weight}</p>
                                        </div>);
                                })
                                :
                                <></>
                            }
                            <SetAdder exercise_id={item._id} refresh={GetWorkoutInfo}></SetAdder>
                            
                           </div>
                        )
                    })
                    :
                    <p>No Exercises</p>
                
            }
            <button className='general-button' onClick={()=>{var t = addingExercise; setAddingExercise(!t);}}>{addingExercise ?  "Cancel" : "Add Exercise" }</button>
            {addingExercise ? <ExerciseAdder workout_id={item} complete={AddedExercise}></ExerciseAdder> : <></>}
            <button className='my-2 absolute top-3/4 left-1/2 -translate-x-1/2 translate-y-10 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={()=>{SelectPage({})}}>Return</button>
            </div>
        </>)
        
}
