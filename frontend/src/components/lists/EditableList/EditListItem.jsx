import React from "react"
import {FaTrash} from 'react-icons/fa6'
export default function EditListItem({object,componentType,removeAction,editMode,index}){
    
    return(
        <div className="flex">
            <p className="pr-2">{index}</p>
            <div class="w-3/4">
                {React.createElement(componentType, object)}
            </div>
            {editMode ?
            <div class="w-1/4 ml-auto flex justify-center">
                <FaTrash onClick={()=>{removeAction(object)}}/>
            </div>
            :
            <></>
            }
            
        </div>
    )
}