import React from "react"
import {FaTrash} from 'react-icons/fa6'

/**
 * Items used by the Editable List Component
 * @component 
 * @description The item used by Editable List, responsible for removing itself based on passing its object to the remove function
 * @param {{Object,Class,Function,boolean,number}} props - Props object
 * @param {Object} props.object - Object containing data for the component
 * @param {Class} props.componentType - Component class react will instantiate with props.object data as props
 * @param {function} props.removeAction - Function to remove this object from the list based on the props.object data
 * @param {boolean} props.editMode - boolean to display removal icon
 * @param {number} props.index - index to display 
 */
export default function EditListItem({object,componentType,removeAction,editMode,index}){
    
    return(
        <div className="flex">
            <p className="pr-2">{index+1}</p>
            <div className={editMode ? "w-3/4" : "w-full"}>
                {React.createElement(componentType, object)}
            </div>
            {editMode ?
            <div className="w-1/4 ml-auto flex justify-center">
                <FaTrash onClick={()=>{removeAction(object)}}/>
            </div>
            :
            <></>
            }
            
        </div>
    )
}