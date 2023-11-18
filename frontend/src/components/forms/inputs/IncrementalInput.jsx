import { FaPlusSquare,FaMinusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";

/**
 * Incremental Input displays a plus, and minus button and allows users to incrememnt/decrement a value
 * @param {*} properties
 * @param {String} properties.name - name for value 
 * @param {Number} properties.value - value we are referencing
 * @param {Number} properties.step - step we want to make per click
 * @param {Number} properties.min - minimum value we can be 
 * @param {Number} properties.max - maximum value we can be
 * @param {Function} properties.onChange - Function to handle changing of the value in some external state
 * @param {Function} properties.valueTransform - A function that takes in the value and tranforms it into some string to display
 * @param {String} properties.label - A label for the input
 * @component
 */
export default function IncrementalInput({name, value, step, min, max, onChange, ...props}){
    const updateVal = (n) =>{
        const newVal = n+value;
        if(newVal >= min && newVal <= max){
            onChange({target:{name:name,value:newVal}})
        }
    }

    
    const {label, valueTransform,styles,bolded=true} = props;


    return (
        <div className={"flex flex-col "+ styles}>
            <div className="">
                <p className={"text-center " + (bolded ? "font-semibold text-xl" : "")}>{label}</p>
            </div>
            <div className={"flex justify-between "}>
                <FaMinusSquare className="w-1/3 text-3xl" onClick={()=>{updateVal(-step)}}/>
                <p>{valueTransform ? valueTransform(String(value)) : value}</p>
                <FaPlusSquare className="w-1/3 text-3xl" onClick={()=>{updateVal(step)}}/>
            </div>
        </div>
        
    )

}