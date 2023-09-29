

export default function SetItem({set, RemoveSet, number, exercise_id}){
    return(

        <>
            <div className="">
                <p className="px-2 font-semibold text-slate-500">{number}.</p>
                
            </div>
            <div className="">
                {set.rep_or_time}
            </div>
            <div className="">
                {set.added_weight}
            </div>
            <button className='justify-end w-8 h-8 rounded-full text-lg hover:text-red-400 font-bold text-center' onClick={()=>{RemoveSet(exercise_id,set._id) }}>-</button>
        </>
                
      
        );
}