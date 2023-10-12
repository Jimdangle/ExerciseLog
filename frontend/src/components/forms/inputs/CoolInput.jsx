import {useState, useEffect} from 'react'
import { rightSlide} from '../../../utility/animations';

export default function CoolInput({props, index,level, setData ,onKey}){
    const {name, value, validation, type, placeholder} = props; // get the things that define us
    
    
    const [dir,setDir] = useState(1)

    
   

    const anim_frames = rightSlide; // our frames for the animation

    

    //Check the direction of our movements, level represents the level the user is on, when it changes we can see which way the user is moving relative to this object
    useEffect(()=>{
        setDir(Math.sign(index-level))
    },[level])

    const [animation, setAnimation] = useState(anim_frames.despawn) // start despawned
    //Ugly animation code idk if this could be put in a custom hook effectively
    useEffect(()=>{
        if(level==index && dir > 0){ // if we are on this index and moving towards it
            setAnimation(anim_frames.spawn) //Summon our object (make it displayed)
            setTimeout(()=>{setAnimation(anim_frames.move_in)},50) // Set the actual animation
        }
        else if(level==index && dir < 0){ //We are on this index but we are moving away from it
            setAnimation(anim_frames.rendered) // clear our animations bc we are rendered
        }
        else if(level<index){ // we are not showing this component
            setAnimation(anim_frames.move_out) //move away and reduce opacity
            
            setTimeout(()=>{setAnimation(anim_frames.despawn)},300) // unrender so we stop taking space
        }
        
    },[index,level])



    return(
    <div className={"duration-300 mt-5 ease-linear grid grid-cols-2"+animation}>
        <p className='h1-white ml-6'>{name}:</p>
        <input className='justify-self-center mr-6 '  name={name} type={type} value={value} onKeyDown={onKey} onChange={(e)=>{setData(e)}} placeholder={placeholder}></input>
    </div>)
}