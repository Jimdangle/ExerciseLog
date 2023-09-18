import {useState} from 'react'
// Given some workout id render its name, and the exercises on it
// button at buttom to add new exercises
// Button on the right of each exercise to remove it 
// button underneath each exercise to allow for adding a set to it 
export default function LogPage({item, SelectPage}){
    console.log(item)
    
    const [logData, setLogData] = useState(item)
    console.log(logData)


    return (<>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-blue-300">
            <h2>{logData.name}</h2>
            {
                logData.exercises.map((item, index) =>{
                    return (
                        <p key={index}>Exercise: {item}</p>
                    )
                })
            }
            <button className='my-2 absolute top-3/4 left-1/2 -translate-x-1/2 translate-y-10 rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400' onClick={()=>{SelectPage({})}}>Return</button>
        </div>
    </>)
}