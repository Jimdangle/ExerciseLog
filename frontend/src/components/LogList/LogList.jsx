
// Make more pretty
import {useState, useEffect, useContext} from 'react';
import {recentLog} from '../../config/cfUtil';

import { TokenContext } from '../../views/Home';

import { isTimeString, GetLocal } from '../../utils/date';

export default function LogList({SelectPage}){
    const token = useContext(TokenContext);
    
    
    const [rawList, setRawList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [newWorkoutName, setNewWorkoutName] = useState("");
    const [showWorkouts, setShowWorkouts] = useState(false)

    function SetMostRecent(workout_id){
        localStorage.setItem(recentLog,workout_id);
        
        
    }

    function SetAndSwap(workout_id){
        SetMostRecent(workout_id);
        SelectPage(1);
    }

    // Sort the initial results by date created
    function sortResults(list){
        return list.sort((a,b)=> {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        })
    }

    async function GetList(){
        try{
            const response = await fetch("http://127.0.0.1:3001/workout/lsm",{
                method: "GET",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors'
            })

            const bod = await response.json();
            if(response.ok){
                if(bod.all){
                    var sorted = sortResults(bod.all)
                    setRawList(sorted);
                    setDisplayList(sorted);
                    if(!localStorage.getItem(recentLog)){
                        SetMostRecent(sorted[0]._id)
                    }
                }
            }
        }
        catch(e){
            console.log(e.message)
        }
        
    }
    
    
    async function AddWorkout(){
        try{
            const response = await fetch('http://localhost:3001/workout/add', {
                method: "POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({name:newWorkoutName})
            })
            const bod = await response.json();
            if(response.ok){
                console.log(bod);
                GetList();
                setNewWorkoutName("");
                SetAndSwap(bod.id);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    
    async function RemoveWorkout(workout_id){
        try{
            const response = await fetch('http://localhost:3001/workout/delete', {
                method: "DELETE",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({workout_id:workout_id})
            })
            const bod = await response.json();
            if(response.ok){
                console.log(bod);
                GetList();
            }
        }
        catch(e){
            console.log(e);
        }
    }
    

    function searchLogs(search_term){
        if(search_term!=""){
            const searched = rawList.filter( (item) => item.name.toLowerCase().indexOf(search_term.toLowerCase()) != -1)
            console.log(search_term)
            console.log(searched);
            setDisplayList(searched);
        }
        else{
            GetList();
        }
    }

    useEffect(()=>{
       GetList();
    },[])
   
    
    

    return(
        <div className="w-auto justify-center">
            <div className='flex flex-col justify-center'>
                <input type="text" placeholder='Name(optional)' value={newWorkoutName } className='mx-6 h-8 my-2 pl-2 text-center focus:text-start duration-150' onChange={(value)=>{setNewWorkoutName(value.target.value)}}></input>
                <button className='button button-e-blue w-36 place-self-center' onClick={AddWorkout}>Start New</button>
            </div>
            
            <h1 className='h1-white ml-4 mt-32' onClick={()=>{setShowWorkouts(!showWorkouts)}}> Past Workouts: <span className='info-blue'>{rawList.length}</span> <button>{showWorkouts ? "v" : ">"}</button></h1>
            
            {
            showWorkouts ? 
            <>
            <div className="w-full h-auto flex flex-col">
                <h1 className="text-center mt-2 h2-white">Search</h1>
                <input type="text" className='mx-6 h-8 pl-2 text-center focus:text-start duration-150' onChange={(value)=>{searchLogs(value.target.value)}}></input>
                <h2 className='text-white text-center'>{displayList.length} / {rawList.length}</h2>
            </div>
            <ul>
                {displayList.map((item,index) => {
                    
                    return (
                        <div key={index} className="workout-item">
                            <div   onClick={()=>{SetAndSwap(item._id)}}>
                                <h1 className="h2-blue">{(item.name && isTimeString(item.name) ? GetLocal(item.name).slice(0,12) : item.name.slice(0,12))}</h1>
                                <p className='info-green-s'>Created:{item.createdAt.slice(0,16)}</p>
                                <p className='info-green-s'>Edited:{item.updatedAt.slice(0,16)}</p>
                            </div>
                            <div className='flex justify-center'>
                                <button className='button button-e-red' onClick={()=>{RemoveWorkout(item._id)}}>Delete</button>
                            </div>
                            
                        </div>
                    )
                })}
            </ul>
            </>
            :
            <></>
            }
            {/**Literal filler, large height, large vertical margin, invisible text */}
            <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
            <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
        </div>
    )
}

