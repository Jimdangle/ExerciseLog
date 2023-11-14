import Modal from "../../components/modals/Modal"
import ModalContainer from "../../components/modals/ModalContainer"
import MuscleOverlayInfo from "./MuscleOverlayInfo"
import MuscleOverlay from "./MuscleOverlay"
/**
 * Contains the muscle overlay as well as buttons to change what is displayed
 */
import { useState } from "react"
import MuscleOverlayFilters from "./MuscleOverlayFilters"
import MuscleOverlayMeta from "./MuscleOverlayMeta"
export default function MuscleOverlayContainer({sumData}){
    const [filter,setFilter] = useState(0);
    console.log(sumData.summary.muscle_z_meta)
    return(
        <div className="bg-white text-gun rounded-md shadow-md mx-2">
            <p className="text-lg font-semibold text-center">Summary</p>
            <MuscleOverlay width={300} muscleData={sumData.summary.muscle_z} muscles={sumData.muscle_list} filter={filter}/>
            <MuscleOverlayFilters filter={filter} setFilter={setFilter}/>
            <MuscleOverlayMeta meta={sumData.summary.muscle_z_meta[filter]}/>
            <MuscleOverlayInfo muscleData={sumData.summary.muscle_z} muscles={sumData.muscle_list} volumeData={sumData.summary.muscles} filter={filter}/>
        </div>  
    )
    
}