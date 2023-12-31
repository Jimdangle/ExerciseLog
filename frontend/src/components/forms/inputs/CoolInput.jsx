import {useState, useEffect} from 'react'
import '../../../styles/animations.css'

/**
 * A input field that is generated by object data, and has some animation
 * @param {{string,object,function,function,string}} props
 * @param {string} props.name - Name for the input
 * @param {object} props.props - input properties passed to us by logical component 
 * @param {function} props.setData - method to set our data
 * @param {function} props.onKey - onKey method 
 * @param {string} props.animation - string css animation 
 * @returns 
 */
export default function CoolInput({name, props, setData ,onKey, animation}){
    const { value, type, validation, error} = props; // get the things that define us
    
    const invalid = !validation(value) && value.length > 0;
    const valid = validation(value) && value.length > 0;



    
    
    return(
    <div className={"my-24"  }>
        {invalid ?  <p className='text-ored text-start absolute translate-y-10 left-1/2 -translate-x-1/2'>{error}</p>:  <></>}
        <input className={animation+ ' text-center input-slick appearance-none focus:scale-110 duration-300 ' + (invalid ?  'input-slick-i' : '') + (valid ?  'input-slick-v' : '') }   name={name} type={type} value={value} onKeyDown={onKey} onChange={(e)=>{setData(e)}} placeholder={name}></input>
        
    </div>)
}