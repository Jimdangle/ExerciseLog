import {useContext, useEffect, useState} from 'react'

import {recentLog} from '../../config/cfUtil';
import ExerciseAdder from '../ExerciseAdder/ExerciseAdder';

import { TokenContext } from '../../views/Home';



import { isTimeString, GetLocal } from '../../utils/date';
import ExerciseItem from './ExerciseItem';
import SummaryView from '../UserInfo/SummaryView';

export default function LogPage({item, SelectPage}){
    
    const token = useContext(TokenContext)
    const [logData, setLogData] = useState({})
    const [addingExercise, setAddingExercise] = useState(false);
    const [summary,setSummary] = useState({})
    useEffect(()=>{Refresh()}, []);

    async function Refresh(){
        GetWorkoutInfo();
        //GetWholeSummary();
    }
    
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
                console.log(bod)
                if(bod.workout){
                    setLogData(bod.workout);
                    console.log('Gettting summary')
                    GetWholeSummary(bod.workout.createdAt);
                }
                else{
                    setLogData({name:"Non valid workout selected"})
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    
    

   

    function AddedExercise(){
        setAddingExercise(false);
        Refresh()
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
                Refresh();
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
                Refresh()
            }
        }
        catch(e){
            console.log(e)
        }
    }


    async function GetWholeSummary(date){ //
        
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
                    body: JSON.stringify({start:date,end:date}) // lol my thinking is there should only be one workout with the start and end equalt to eachother
                })

                if(response.ok){
                    const bod = await response.json();
                    console.log(bod);
                    setSummary(bod.summary);
                }
            }
            catch(e){
                console.log(e);
            }
        }
    

    return (
            <div className="w-auto h-auto mx-2 p-2 overflow-scroll shadow-lg rounded-md">
                
                <h2 className='font-semibold text-center text-green-400 text-2xl'>{(logData && logData.name && isTimeString(logData.name) ? GetLocal(logData.name).slice(0,24) : (logData.name ? logData.name : ""))}</h2>
                {
                    
                    logData.exercises ? 
                        logData.exercises.map((item, index) =>{
                            //console.log(item)
                            return <ExerciseItem key={index} item={item} RemoveExercise={RemoveExercise} RemoveSet={RemoveSet} refresh={Refresh}></ExerciseItem>
                        })
                        :
                        <p>No Exercises</p>
                    
                }
                <div className='grid grid-row-2'>
                    <button className='m-2 rounded-md p-2 bg-green-400 focus:scale-90 duration-75 text-white font-semibold justify-self-center' onClick={()=>{var t = addingExercise; setAddingExercise(!t);}}>{addingExercise ?  "Cancel" : "Add Exercise" }</button>
                    {addingExercise ? <ExerciseAdder workout_id={localStorage.getItem(recentLog)} complete={AddedExercise}></ExerciseAdder> : <></>}
                </div>
                
                <div className='mt-5 flex justify-center'>
                    <h1 className='font-semibold text-xl text-white'>Workout Summary</h1>
                </div>
                {summary ? <SummaryView Summary={summary}></SummaryView> : <></>}
                
                {/**Literal filler, large height, large vertical margin, invisible text */}
                <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>

                {/**Button to return doesnt set nav bar */}
                <button className='button button-e-green' onClick={()=>{SelectPage(0)}}>Return</button>

                 {/**Literal filler, large height, large vertical margin, invisible text */}
                <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
            </div>
        )
        
}
