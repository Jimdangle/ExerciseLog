import { useEffect, useState } from "react";


export default function useAnimation(show){
    const [shouldAnimate, setShouldAnimate] = useState(show)
    const [first,setFirst] = useState({mount:true,dismount:true})
    useEffect(()=>{
        if(first.mount)
        {
            console.log('first mount')
            setFirst((a)=>{ return {...a,mount:false}})
            
        }
        else{
            console.log(`Starting Animation`)
            setShouldAnimate(true);
        }
        
        
        return () => {
            if(first){
                setFirst((a)=>{ return {...a,dismount:false}})
                console.log(`First dismount`)
            }
            else{
                setShouldAnimate(false);
                console.log('Ending Animation')
            }
        }
    },[])

    return {animate:shouldAnimate}
}