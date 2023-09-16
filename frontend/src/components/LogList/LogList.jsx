
// Make more pretty
import {useState} from 'react';

export default function LogList({list}){
    const [displayList, setDisplayList] = useState(list);


    function searchLogs(search_term){
        const searched = list.filter( (item) => item.name.indexOf(search_term) != -1)
        console.log(searched);
        setDisplayList(searched);
    }

    //Idk if this is even actually needed
    function resetLogs(){
        setDisplayList(list);
    }


    return(<>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
            <div className="w-full h-12 bg-green-200 flex">
                <h1 className="text-center font-semibold text-3xl">Recent Workouts</h1>
                <input type="text" className='ml-6 my-2 focus:form-active-input form-nonactive-input duration-150' onChange={(value)=>{searchLogs(value.target.value)}}></input>
            </div>
            <ul>
                {displayList.map((item) => {
                    return (
                        <button key={item.key} className="my-6 py-3 px-2 w-full h-24 rounded-md shadow-md bg-blue-200">
                            <h1 className="font-bold text-lg">{item.name} <span>{item.created_at}</span></h1>
                            <p>{item.key}</p>
                        </button>
                    )
                })}
            </ul>
        </div>
    </>)
}

