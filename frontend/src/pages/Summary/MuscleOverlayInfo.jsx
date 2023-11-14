import { textColorByZScore } from "../../utility/image"
import { useMemo } from "react"
export default function MuscleOverlayInfo({muscleData,volumeData,muscles,filter=0}){
    // I want to sort this data
    const displayData = []
    muscles.forEach((muscle,index)=>{
        
        const z = muscleData[filter][muscle] ? muscleData[filter][muscle] : -3
        const vol = volumeData[filter][muscle] ? volumeData[filter][muscle] : 0
        // if there is muscleData there should be volumeData bc the muscleData is made from the volumeData on the backend
        displayData[index] = {name:muscle,z:z, value:vol}
    })

    const sorted = useMemo(()=>displayData.sort((a,b)=>{
        return b.z - a.z
    }),[muscleData,volumeData,filter])


    

    return(
        <div className="w-auto flex justify-center">
            <div className="flex flex-col">
                {
                    muscles && muscleData ?
                    sorted.map((muscle,index) => {
                        return (
                            <div key={muscle.name+index+"disp"}>
                                {muscle.value !== 0
                                    ?
                                    <p  className={"font-semibold text-center " + textColorByZScore(muscle.z)} >{muscle.name} : {Math.round(muscle.value*10)/10}</p>
                                    :
                                    <></>
                                }
                            </div>
                        )
                    })
                    :
                    <></>
                }
            </div>
        </div>
    )
}