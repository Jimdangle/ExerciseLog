// Just needs to support accurate removal of objects

import { useState } from "react";
import React from "react";
import {FaEraser} from 'react-icons/fa6'
import EditListItem from "./EditListItem";

/**
 * Editable List Component
 * @component
 * @description  A componant capable of rendering a list of objects given some component class that takes that type of object in as properties
 * @param {{String,Array,Function,Class}} props - main properties
 * @param {string} param.title - Name to display on top of list  / used for the key generation so react doesnt get mad
 * @param {Array} props.list - An array of objects that can map to the componentType
 * @param {function} props.removeAction - A function / action to do when we remove an object. Takes in an object as input
 * @param {Class} props.componentType - A component class that has properties that align with the object
 */
export default function EditableList({title,list,removeAction,componentType}){
    const [isEditing,setIsEditing] = useState(false); // enable editing via the edit button, when editing enabled produce a removal button for the objects produced
    const toggle=()=>{setIsEditing((v)=>{return !v})}
    return(
        <div className="flex flex-col">
            <div className="flex justify-end mr-2">
                <FaEraser onClick={toggle} className={isEditing? ' text-ored' : ' text-gun'}/>
            </div>
            {
                list.map((item,index)=>{
                   
                    return <EditListItem key={`${title}-el-${index}`} object={item} removeAction={removeAction} editMode={isEditing} componentType={componentType} index={index}/>
                })
            }
        </div>
    )

}