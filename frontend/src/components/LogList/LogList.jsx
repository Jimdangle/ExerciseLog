
// Make more pretty
import {useState, useEffect} from 'react';

export default function LogList({GetList, SelectPage}){

    const [displayList, setDisplayList] = useState([]);

    useEffect(()=>{
        GetList(setDisplayList);
    },[])
   
    
    
    

    function searchLogs(search_term){
        if(search_term!=""){
            const searched = displayList.filter( (item) => item.name.indexOf(search_term) != -1)
            console.log(search_term)
            console.log(searched);
            setDisplayList(searched);
        }
        else{
            GetList();
        }
    }

    return(<>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
            <div className="w-full h-12 bg-green-200 flex">
                <h1 className="text-center font-semibold text-3xl">Recent Workouts</h1>
                <input type="text" className='ml-6 my-2 focus:form-active-input form-nonactive-input duration-150' onChange={(value)=>{searchLogs(value.target.value)}}></input>
            </div>
            <ul>
                {displayList.map((item,index) => {
                    
                    return (
                        <button key={index} className="my-6 py-3 px-2 w-full h-32 rounded-md shadow-md bg-blue-200" onClick={()=>{SelectPage(item)}}>
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

