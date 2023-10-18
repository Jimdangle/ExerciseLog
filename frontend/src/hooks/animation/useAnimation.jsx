import { useEffect, useState } from "react";


export default function useAnimation(show){
    const [shouldAnimate, setShouldAnimate] = useState(show)
    
    useEffect(()=>{
        setShouldAnimate(show)

        return ()=> {setShouldAnimate(!show)}
    },[show])

    return {animate:shouldAnimate}
}