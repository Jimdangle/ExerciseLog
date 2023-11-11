import { textColorByZScore } from "../../utility/image"

export default function MuscleOverlayInfo({muscleData,muscles,filter=0}){

    return(
        <div className="w-auto">
                {
                    muscles && muscleData ?
                    muscles.map((muscle,index) => {
                        console.log(muscle)
                        return (
                            <p key={muscle+index+"disp"} className={"font-semibold " + textColorByZScore((muscleData[filter][muscle] ? muscleData[filter][muscle] : -3 ))}>{muscle}</p>
                        )
                    })
                    :
                    <></>
                }
            </div>
    )
}