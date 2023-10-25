// Just needs to support accurate removal of objects

import { useState } from "react";
import {FaEraser} from 'react-icons/fa6'
import EditListItem from "./EditListItem";
export default function EditableList({title,list,removeAction,component}){
    const [isEditing,setIsEditing] = useState(false); // enable editing via the edit button, when editing enabled produce a removal button for the objects produced

    return(
        <div className="flex">
            <p>{title}</p>
            
        </div>
    )

}