import { useEffect } from "react"
export default function useLeftSlide(index,level,setAnimation){
    
    //Ugly animation code idk if this could be put in a custom hook effectively
    useEffect(()=>{
        if(level==index){ // if our level is greater than the index render our component
            setAnimation('block opacity-0')
            setTimeout(()=>{setAnimation(' translate-y-0 opacity-100 mt-5')},50)
        }
        else if(level<index){
            setAnimation(' -translate-y-0 opacity-0')
            
            setTimeout(()=>{setAnimation('hidden')},300) // otherwise unrender
        }
        else{
            setAnimation('mt-5')
        }
    },[index,level])
}