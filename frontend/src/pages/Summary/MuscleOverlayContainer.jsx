import Modal from "../../components/modals/Modal"
import ModalContainer from "../../components/modals/ModalContainer"
import MuscleOverlayInfo from "./MuscleOverlayInfo"
import MuscleOverlay from "./MuscleOverlay"
/**
 * Contains the muscle overlay as well as buttons to change what is displayed
 */
export default function MuscleOverlayContainer({sumData}){

    return(
        <ModalContainer title={"Workout Summary"}>
                {(closeModal,toggleModal) => (
                    <Modal title={"Summary Display"} isOpen={toggleModal} onClose={closeModal}>
                        <MuscleOverlay width={200} muscleData={sumData.summary.muscle_z} muscles={sumData.muscle_list}/>
                        <MuscleOverlayInfo muscleData={sumData.summary.muscle_z} muscles={sumData.muscle_list} volumeData={sumData.summary.muscles}/>
                    </Modal>
                    
                )}
        </ModalContainer>
    )
    
}