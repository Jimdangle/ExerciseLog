/* Pass in a list of objects, and the field from the object we want to be rendered */
// Each item will be displayed with a display field from the object
// Passing the component a function  that can perform an action on a 
import {useState} from 'react'
import ActionListItem from "./ActionListItem";
export default function SearchableList({title,list,action,fields }){
    const {display_field,action_field} = fields; //fields should be the string access for the objects contained in the list
    const [searchString, setSearchString] = useState('')

    return(
        <div className="text-center">
            <input type='search' onChange={(e)=>{setSearchString(e.target.value)}}></input>
            {list.filter(
                (object)=>{
                    const name = object[display_field].toLowerCase();
                    
                    return (searchString==="" || (name.indexOf(searchString.toLowerCase()) != -1))
                }
                ).map((object,index)=>{
                    return  <ActionListItem key={title+"SL"+index} title={object[display_field]} action={()=>{action(object[action_field])}}></ActionListItem>
            })}
        </div>
    )


}