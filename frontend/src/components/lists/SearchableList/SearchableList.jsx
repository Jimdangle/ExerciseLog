/* Pass in a list of objects, and the field from the object we want to be rendered */
// Each item will be displayed with a display field from the object
// Passing the component a function  that can perform an action on a 
import {useState} from 'react'
import ActionListItem from "./ActionListItem";

/**
 * A searchable list component, allows users to filter by names
 * @param {{string,Array,function, Object}} props 
 * @param {string} props.title - title for the list
 * @param {Array} props.list - the list of data we want to search
 * @param {function} props.action - action for the items displayed by the list
 * @param {Object} props.fields - **note** needs to have a display_field and action_field property
 * @param {string} fields.display_field - field to search our objects by and display to the user
 * @param {string} fields.action_field - field to send to our action function from the object 
 * @component
 */
export default function SearchableList({title,list,action,fields }){
    const {display_field,action_field} = fields; //fields should be the string access for the objects contained in the list
    const [searchString, setSearchString] = useState('')

    return(
        <div className="text-center">
            <input type='search' className='text-center focus:font-bold px-2' placeholder='search' onChange={(e)=>{setSearchString(e.target.value)}}></input>
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