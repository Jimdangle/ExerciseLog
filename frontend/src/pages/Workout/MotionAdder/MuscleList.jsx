import SearchableList from "../../../components/lists/SearchableList/SearchableList";
import ModalContainer from "../../../components/modals/ModalContainer"
import Modal from "../../../components/modals/Modal";
export default function MuscleList({action,list}){
    
    const filters = [
        {name:"Chest", filter: (list) => {return list.filter((item)=>{return (item.group==="Chest")})}},
        {name:"Back", filter: (list) => {return list.filter((item)=>{return (item.group==="Back")})}},
        {name:"Shoulders", filter: (list) => {return list.filter((item)=>{return (item.group==="Shoulders")})}},
        {name:"Arms", filter: (list) => {return list.filter((item)=>{return (item.group==="Arms")})}},
        {name:"Legs", filter: (list) => {return list.filter((item)=>{return (item.group==="Legs")})}},
        {name:"Core", filter: (list) => {return list.filter((item)=>{return (item.group==="Core")})}},
    ]

    return(
        <ModalContainer title={"Add Muscle"}>
                     {(closeModal,toggleModal) => (
                        <Modal title={"Add Muscle"} isOpen={toggleModal} onClose={closeModal}>
                           <div className="h-64 overflow-y-scroll">
                                <SearchableList filters={filters} title="Add Muscle" list={list} action={(muscle)=>{action(muscle); closeModal();}} fields={{display_field:'muscle',action_field:'muscle'}}/>
                            </div>
                        </Modal>
                    )}
                </ModalContainer>
        
    )

}