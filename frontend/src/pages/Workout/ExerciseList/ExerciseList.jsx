import SearchableList from "../../../components/lists/SearchableList/SearchableList";

export default function ExerciseList(){
    const items = [
        {t:"test1asdasdasd", a: '1'},
        {t:"test2", a: '2'},
        {t:"test3", a: '3'},
        {t:"test4", a: '4'},
    ]

    function action(key){
        console.log(`Action id ${key}`)
    }

    return (
        <SearchableList title={"Test List"} list={items} action={action} fields={{display_field:'t', action_field:'a'}}></SearchableList>
    )

}