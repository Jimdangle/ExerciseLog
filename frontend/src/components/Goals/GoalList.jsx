import {useState, useContext, useEffect} from 'react'
import { TokenContext } from '../../views/Home'
import GoalItem from './GoalItem';

export default function GoalList({setGoal,setViewingGoal,addedGoal}){
    const token = useContext(TokenContext);
    const [rawList,setRawList] = useState([])
    const [search, setSearch] = useState("")
    

    useEffect(()=>{GetGoals()},[])

    async function GetGoals(){
        try{
            const response = await fetch('http://localhost:3001/goals/ls',{
                method: "GET",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                setRawList(bod.found);
                
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    async function RemoveGoal(goal_id){
        try{
            const response = await fetch('http://localhost:3001/goals/rem',{
                method: "DELETE",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({goal_id:goal_id}),
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                GetGoals();
                
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    return (
    <div>
        <button className='button button-e-blue' onClick={GetGoals}>Refresh List</button>
        <input type="text" className='text-black' placeholder='search' value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
        <div className='flex flex-col place-items-center'>
            {/**The Mad Lad one liner search */}
            {rawList.filter((item)=>{  return (item.name && (item.name.toLowerCase()).indexOf(search.toLowerCase()) != -1) }).map((item,index) => { return <GoalItem key={index+"llcoolGoal"} goal={item} setGoal={setGoal} setViewingGoal={setViewingGoal} RemoveGoal={RemoveGoal}></GoalItem>})}
        </div>
    </div>)
}