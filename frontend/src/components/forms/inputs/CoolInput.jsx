import {useState, useEffect} from 'react'
export default function CoolInput({props, index,level, setData ,onKey}){
    const {name, value, validation, type, placeholder} = props; // get the things that define us
    


    const [animation, setAnimation] = useState(' -translate-y-full opacity-0')
    //Ugly animation code idk if this could be put in a custom hook effectively
    useEffect(()=>{
        if(level==index){ // if our level is greater than the index render our component
            setAnimation('block opacity-0')
            setTimeout(()=>{setAnimation(' translate-y-0 opacity-100')},50)
        }
        else if(level<index){
            setAnimation(' translate-y-full opacity-0')
            
            setTimeout(()=>{setAnimation('hidden')},300) // otherwise unrender
        }
        else{
            setAnimation('')
        }
    },[index,level])



    return(
    <div className={"duration-300 mt-5 ease-linear grid grid-cols-2 "+animation}>
        <p className='h1-white ml-6'>{name}:</p>
        <input className='justify-self-center mr-6 '  name={name} type={type} value={value} onKeyDown={onKey} onChange={(e)=>{setData(e)}} placeholder={placeholder}></input>
    </div>)
}