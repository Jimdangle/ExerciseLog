import {useContext, useEffect, useState} from 'react'

import {recentLog} from '../../config/cfUtil';
import ExerciseAdder from '../ExerciseAdder/ExerciseAdder';
import SetAdder from '../SetAdder/SetAdder';
import { TokenContext } from '../../views/Home';


export default function LogPage({item, SelectPage}){
    
    const token = useContext(TokenContext)
    useEffect(()=>{loadMostRecent()}, []);

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
            body: JSON.stringify( {workout_id:localStorage.getItem(recentLog)})
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

    
    function loadMostRecent(){
        if(localStorage.getItem(recentLog)){
            GetWorkoutInfo(localStorage.getItem(recentLog));
        }
        else{
       
        }
    }

    const [logData, setLogData] = useState({})
    const [addingExercise, setAddingExercise] = useState(false);

    function AddedExercise(){
        setAddingExercise(false);
        GetWorkoutInfo(localStorage.getItem(recentLog));
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
                body:JSON.stringify({workout_id:localStorage.getItem(recentLog),exercise_id:exercise_id})
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


    return (
            <div className="w-auto h-auto m-2 p-2 bg-blue-300 overflow-scroll shadow-lg rounded-md">
                <h2>{logData.name}</h2>
                {console.log(logData)}
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
                <button className='general-button' onClick={()=>{var t = addingExercise; setAddingExercise(!t);}}>{addingExercise ?  "Cancel" : "Add" }</button>
                {addingExercise ? <ExerciseAdder workout_id={localStorage.getItem(recentLog)} complete={AddedExercise}></ExerciseAdder> : <></>}
                <button className='my-2 mx-2 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={()=>{SelectPage(0)}}>Return</button>
            </div>
        )
        
}
