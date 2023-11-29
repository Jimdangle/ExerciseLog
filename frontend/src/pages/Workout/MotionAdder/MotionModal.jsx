import ModalContainer from "../../../components/modals/ModalContainer";
import Modal from "../../../components/modals/Modal";
import MotionAdder from "./MotionAdder";
export default function MotionModal({getData}){
    return(
        <ModalContainer title={"Add Motion"} styles="button-e-blue">
                {(closeModal,toggleModal) => (
                    <Modal title={"Create a new Motion"} isOpen={toggleModal} onClose={closeModal}>
                        <MotionAdder closeModal={closeModal} getData={getData}/>
                    </Modal>
                    
                )}
            </ModalContainer>
    )
}