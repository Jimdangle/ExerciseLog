
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
        <div className="w-auto m-2">
            <button className='my-2 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={AddWorkout}>Add New</button>
            <input type="text" value={newWorkoutName } className='ml-6 my-2 focus:form-active-input form-nonactive-input duration-150' onChange={(value)=>{setNewWorkoutName(value.target.value)}}></input>
            <div className="w-full h-auto bg-green-200 flex">
                <h1 className="text-center font-semibold text-3xl">Recent Workouts</h1>
                <input type="text" className='mr-6 ml-2 my-2 focus:form-active-input form-nonactive-input scale-75 hover:scale-100 duration-150' onChange={(value)=>{searchLogs(value.target.value)}}></input>
            </div>
            <ul>
                {displayList.map((item,index) => {
                    
                    return (
                        <div key={index} className="my-6 py-3 px-2 w-full h-auto rounded-md shadow-md bg-blue-200">
                            <div   onClick={()=>{SetAndSwap(item._id)}}>
                                <h1 className="font-bold text-lg">{(item.name && isTimeString(item.name) ? GetLocal(item.name) : item.name)}</h1>
                                <p>Created:{item.createdAt}</p>
                                <p>Edited:{item.updatedAt}</p>
                            </div>
                            <button className='inline general-button' onClick={()=>{RemoveWorkout(item._id)}}>-</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

