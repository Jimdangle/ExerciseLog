import {useState, useEffect} from 'react'
import './styles.css'
export default function CoolInput({props, setData ,onKey, active}){
    const {name, value, type, placeholder} = props; // get the things that define us
    
    
    
    return(
    <div className={"duration-300 mt-5 ease-linear grid grid-cols-2 slider "  }>
        <p className='h1-white ml-6'>{name}:</p>
        <input className='justify-self-center mr-6 '  name={name} type={type} value={value} onKeyDown={onKey} onChange={(e)=>{setData(e)}} placeholder={placeholder}></input>
    </div>)
}