import SearchableList from "../../../components/lists/SearchableList/SearchableList";
export default function MuscleList({action,list, closeModal}){
    function closeAction(muscle){
        action(muscle);
        closeModal();
    }

    return(
        <div className="h-64 overflow-y-scroll">
            <SearchableList title="Add Muscle" list={list} action={closeAction} fields={{display_field:'muscle',action_field:'muscle'}}/>
        </div>
    )

}