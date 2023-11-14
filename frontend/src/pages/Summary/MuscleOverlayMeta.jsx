
export default function MuscleOverlayMeta({meta}){
    return(
        <div className="flex">
            <p className="w-1/2 text-center">Average: {meta.average}</p>
            <p className="w-1/2 text-center">Standard Deviation: {Math.round(meta.sigma*10)/10}</p>
        </div>
    )
}