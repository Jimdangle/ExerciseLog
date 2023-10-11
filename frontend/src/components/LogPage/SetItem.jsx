import { useState, useEffect} from "react";
export default function SetItem({set, RemoveSet, number, exercise_id, type}){
    const [spawn,setSpawn] = useState(" opacity-0 -translate-y-5")

    function delaySpawn(){
        setTimeout( ()=>{
            setSpawn(" opacity-100 translate-y-0")
            console.log(spawn)
        },50)
    }

    function deSpawn(){
        setSpawn(" opacity-0 -translate-y-5")
        setTimeout(() => {
            RemoveSet(exercise_id,set._id)
        }, (200));
    }

    useEffect( ()=> {delaySpawn()}, [])

    function convertSecondsTime(){
        const val = set.rep_or_time;
        // have a value in seconds
        // 
        const h = Math.floor(val/3600); // 3600 seconds per hour
        const m = Math.floor((val-h*3600)/60); // what ever we have left, divide by 60 seconds per min
        const s = val - h*3600 - 60*m; // subtract out all of those and we have our remaining seconds


        return `${h}:${m}:${s}`
    }


    return(

        <div className={"duration-200 grid grid-cols-4 "+spawn}>
            <p className="">{number}.</p>
            <p className="">
                {type==0 ? set.rep_or_time : convertSecondsTime()}
            </p>
            <p className="">
                {set.added_weight}
            </p>
            <button className='justify-end text-ored font-bold text-lg text-center' onClick={()=>{deSpawn() }}>-</button>
        </div>
                
      
        );
}