

export default function MuscleOverlayFilters({filter,setFilter}){
    return(
        <div className="flex justify-center">
            <button onClick={()=>{setFilter(0)}} className={`button ${(filter===0 ? 'button-e-white' : 'button-e-blue')}`}>Lifts</button>
            <button onClick={()=>{setFilter(1)}} className={`button ${(filter===1 ? 'button-e-white' : 'button-e-blue')}`}>Cardio</button>
            <button onClick={()=>{setFilter(2)}} className={`button ${(filter===2 ? 'button-e-white' : 'button-e-blue')}`}>Holds</button>
        </div>
    )
}