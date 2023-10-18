import {useState, useEffect} from 'react'
import '../../../styles/animations.css'

export default function CoolInput({name, props, setData ,onKey, active}){
    const { value, type, validation, error} = props; // get the things that define us
    
    const invalid = !validation(value) && value.length > 0;
    const valid = validation(value) && value.length > 0;



    
    
    return(
    <div className={"my-24"  }>
        {invalid ?  <p className='text-ored text-start absolute translate-y-10 left-1/2 -translate-x-1/2'>{error}</p>:  <></>}
        <input className={'slider text-center input-slick appearance-none focus:scale-110 duration-300 ' + (invalid ?  'input-slick-i' : '') + (valid ?  'input-slick-v' : '') }   name={name} type={type} value={value} onKeyDown={onKey} onChange={(e)=>{setData(e)}} placeholder={name}></input>
        
    </div>)
}