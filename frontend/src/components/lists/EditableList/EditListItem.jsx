import React from "react"
import {FaTrash} from 'react-icons/fa6'
export default function EditListItem(object,component,removeAction,editMode){
    return(
        <div className="flex">
            <div class="w-3/4">
                {React.createElement(component, {object})}
            </div>
            {editMode ?
            <div class="w-auto mr-auto">
                <FaTrash onClick={removeAction}/>
            </div>
            :
            <></>
            }
            
        </div>
    )
}