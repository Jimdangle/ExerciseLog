
export default function SetItem({set, RemoveSet, number, exercise_id, type}){
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

        <>
            <div className="">
                <p className="str-blue">{number}.</p>
                
            </div>
            <div className="">
                {type==0 ? set.rep_or_time : convertSecondsTime()}
            </div>
            <div className="">
                {set.added_weight}
            </div>
            <button className='justify-end text-ored font-bold text-lg text-center' onClick={()=>{RemoveSet(exercise_id,set._id) }}>-</button>
        </>
                
      
        );
}