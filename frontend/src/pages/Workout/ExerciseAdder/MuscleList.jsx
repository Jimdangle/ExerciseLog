import SearchableList from "../../../components/lists/SearchableList/SearchableList";
export default function MuscleList({action,list}){

    return(
        <div>
            <SearchableList title="Add Muscle" list={list} action={action} fields={{display_field:'muscle',action_field:'muscle'}}/>
        </div>
    )

}