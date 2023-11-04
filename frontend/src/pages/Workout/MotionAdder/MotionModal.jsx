import ModalContainer from "../../../components/modals/ModalContainer";
import Modal from "../../../components/modals/Modal";
import MotionAdder from "./MotionAdder";
export default function MotionModal({}){
    return(
        <ModalContainer title={"Add Motion"}>
                {(closeModal,toggleModal) => (
                    <Modal title={"Create a new Motion"} isOpen={toggleModal} onClose={closeModal}>
                        <MotionAdder/>
                    </Modal>
                    
                )}
            </ModalContainer>
    )
}