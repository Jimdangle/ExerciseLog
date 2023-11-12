import { textColorByZScore } from "../../utility/image"
import { useMemo } from "react"
export default function MuscleOverlayInfo({muscleData,volumeData,muscles,filter=0}){
    // I want to sort this data
    const displayData = []
    muscles.forEach((muscle,index)=>{
        console.log(muscle)
        const z = muscleData[filter][muscle] ? muscleData[filter][muscle] : -3
        const vol = volumeData[filter][muscle] ? volumeData[filter][muscle] : 0
        // if there is muscleData there should be volumeData bc the muscleData is made from the volumeData on the backend
        displayData[index] = {name:muscle,z:z, value:vol}
    })

    const sorted = useMemo(()=>displayData.sort((a,b)=>{
        return b.z - a.z
    }),[muscleData,volumeData,filter])


    console.log(sorted)

    return(
        <div className="w-auto">
                {
                    muscles && muscleData ?
                    sorted.map((muscle,index) => {
                        return (
                            <p key={muscle.name+index+"disp"} className={"font-semibold " + textColorByZScore(muscle.z)} >{muscle.name} : {Math.round(muscle.value*10)/10}</p>
                        )
                    })
                    :
                    <></>
                }
            </div>
    )
}