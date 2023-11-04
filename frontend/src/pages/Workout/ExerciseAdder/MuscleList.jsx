import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import ModalContainer from "../../../components/modals/ModalContainer"
import Modal from "../../../components/modals/Modal";
export default function MuscleList({action,list}){
    

    return(
        <ModalContainer title={"Add Muscle"}>
                     {(closeModal,toggleModal) => (
                        <Modal title={"Add Muscle"} isOpen={toggleModal} onClose={closeModal}>
                           <div className="h-64 overflow-y-scroll">
                                <SearchableList title="Add Muscle" list={list} action={(muscle)=>{action(muscle); closeModal();}} fields={{display_field:'muscle',action_field:'muscle'}}/>
                            </div>
                        </Modal>
                    )}
                </ModalContainer>
        
    )

}