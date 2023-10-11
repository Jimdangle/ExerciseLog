import {useContext, useEffect, useState} from 'react'

import {recentLog} from '../../config/cfUtil';
import ExerciseAdder from './ExerciseAdder/ExerciseAdder';

import { TokenContext, PageContext } from '../../views/Home';



import { isTimeString, GetLocal } from '../../utils/date';
import ExerciseItem from './ExerciseItem';
import SummaryView from '../UserInfo/SummaryView';

import { FaEdit } from "react-icons/fa";

export default function LogPage({item, SelectPage}){
    
    const token = useContext(TokenContext)
    const setPage = useContext(PageContext);
    const [logData, setLogData] = useState({})
    const [addingExercise, setAddingExercise] = useState(false);
    const [summary,setSummary] = useState({})
    const [name,setName] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
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
                    setPage(0);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async function EditWorkoutName(){
        try {
            const response = await fetch('http://localhost:3001/workout/editName',{
            method: "POST",
            headers: {
                'Origin': 'http://127.0.0.1:3000',
                'Content-Type': 'application/json',
                'authorization': token
            },
            mode:'cors',
            body: JSON.stringify( {workout_id:localStorage.getItem(recentLog), name:name})
            });
        }
        catch (e) {
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

        
    function startEditingName() {setName(logData.name); setIsEditingName(true);}

    async function handleUserAction(e) {
        /* Get the keycode from the event */
        const {key} = e;
        /* Enter -> Submit the name change */
        if (key == "Enter"){await EditWorkoutName(); setIsEditingName(false); await GetWorkoutInfo();}
        /* Escape -> backout of the edit */
        if (key == "Escape"){setIsEditingName(false);}
    }

    return (
            <div className="w-auto h-auto mx-2 p-2 flex flex-col justify-center">
                {
                    isEditingName ? 
                        <div className="flex justify-center">
                            <input type="text" value={name} className="text-center h1-blue bg-gun place-self-center" onChange={(e)=>setName(e.target.value)} onKeyDown={async (e)=>handleUserAction(e)}></input>
                        </div>
                        :
                        <h2 className='text-center h1-blue'>{ (logData && logData.name) ? logData.name.slice(0,16) : ""} <FaEdit className="inline" onClick={()=>startEditingName()} /></h2>
                }
                {
                    logData.exercises ? 
                        logData.exercises.map((item, index) =>{
                            //console.log(item)
                            return <ExerciseItem key={index} item={item} RemoveExercise={RemoveExercise} RemoveSet={RemoveSet} refresh={Refresh}></ExerciseItem>
                        })
                        :
                        <></>
                }
                <div className='grid grid-row-2'>
                    <button className='m-2 button button-e-blue justify-self-center' onClick={()=>{var t = addingExercise; setAddingExercise(!t);}}>{addingExercise ?  "Cancel" : "Add Exercise" }</button>
                    {addingExercise ? <ExerciseAdder workout_id={localStorage.getItem(recentLog)} complete={AddedExercise}></ExerciseAdder> : <></>}
                </div>
                
                
                {summary ? <SummaryView Summary={summary}></SummaryView> : <></>}
                
                {/**Literal filler, large height, large vertical margin, invisible text */}
                <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>

                {/**Button to return doesnt set nav bar */}
                <button className='button button-e-blue' onClick={()=>{SelectPage(0)}}>Return</button>

                 {/**Literal filler, large height, large vertical margin, invisible text */}
                <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
            </div>
        )
        
}
