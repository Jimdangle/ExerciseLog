// The simplest type we only have to display a rep and weight value directly
export default function SetLift({rep_or_time,added_weight}){
    return(
        <div className="flex justify-between">
            <p>Reps: {rep_or_time}</p>
            <p>Weight: {added_weight}</p>
        </div>
    )
}