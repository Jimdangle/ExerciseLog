

export default function SetItem({set, RemoveSet, number, exercise_id, type}){
    return(

        <>
            <div className="">
                <p className="str-green">{number}.</p>
                
            </div>
            <div className="">
                {set.rep_or_time}
            </div>
            <div className="">
                {set.added_weight}
            </div>
            <button className='justify-end text-ored font-bold text-lg text-center' onClick={()=>{RemoveSet(exercise_id,set._id) }}>-</button>
        </>
                
      
        );
}