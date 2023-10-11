import {useState, useEffect, useContext} from 'react';
import {recentLog} from '../../config/cfUtil';
import { TokenContext } from '../../views/Home';
import RecentGoals from '../Goals/RecentGoals';

export default function LogMaker({setPage}){


    const [newWorkoutName, setNewWorkoutName] = useState("");
    const token = useContext(TokenContext)

    function SetMostRecent(workout_id){
        localStorage.setItem(recentLog,workout_id);
        
        
    }

    function SetAndSwap(workout_id){
        SetMostRecent(workout_id);
        setPage(1);
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
                setNewWorkoutName("");
                SetAndSwap(bod.id);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    


    return (
        <div className='flex flex-col justify-center'>
                <p className='text-center h2-blue'>Make A New Workout</p>
                <input type="text" placeholder='(optional)' value={newWorkoutName } className='mx-6 h-8 my-2 pl-2 text-center focus:text-start duration-150' onChange={(value)=>{setNewWorkoutName(value.target.value)}}></input>
                <button className='button button-e-blue w-36 place-self-center' onClick={AddWorkout}>Start New</button>
            
            <div className='mt-10'><p className='text-gun'>t</p></div>
           
            <RecentGoals></RecentGoals>
        </div>
    )
}