
// Make more pretty
import {useState, useEffect} from 'react';

export default function LogList({GetList, SelectPage, token}){

    
    const [rawList, setRawList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [newWorkoutName, setNewWorkoutName] = useState("");

    useEffect(()=>{
        GetList(setRawList);
        GetList(setDisplayList);
    },[])
   
    
    
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
                body: JSON.stringify( {name: newWorkoutName})
            })

            const bod = await response.json();
            if(response.ok){
                console.log(bod);
                GetList(setRawList);
                GetList(setDisplayList)
                setNewWorkoutName("");
            }
        }
        catch(e){
            console.error(e.message);
        }
    }
    
    

    function searchLogs(search_term){
        if(search_term!=""){
            const searched = rawList.filter( (item) => item.name.indexOf(search_term) != -1)
            console.log(search_term)
            console.log(searched);
            setDisplayList(searched);
        }
        else{
            GetList(setRawList);
        }
    }

    return(<>
        <div className=" w-3/4">
            <button className='my-2 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={AddWorkout}>Add New</button>
            <input type="text" value={newWorkoutName } className='ml-6 my-2 focus:form-active-input form-nonactive-input duration-150' onChange={(value)=>{setNewWorkoutName(value.target.value)}}></input>
            <div className="w-full h-12 bg-green-200 flex">
                <h1 className="text-center font-semibold text-3xl">Recent Workouts</h1>
                <input type="text" className='ml-6 my-2 focus:form-active-input form-nonactive-input duration-150' onChange={(value)=>{searchLogs(value.target.value)}}></input>
            </div>
            <ul>
                {displayList.map((item,index) => {
                    
                    return (
                        <button key={index} className="my-6 py-3 px-2 w-full h-32 rounded-md shadow-md bg-blue-200" onClick={()=>{SelectPage(item._id)}}>
                            <h1 className="font-bold text-lg">{item.name}</h1>
                            <p>Created:{item.createdAt}</p>
                            <p>Edited:{item.updatedAt}</p>
                        </button>
                    )
                })}
            </ul>
        </div>
    </>)
}

