import { FaPlusSquare,FaMinusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function IncrementalInput({name, value, increment, setValue, ...props}){
    const [val,setVal] = useState(value);
    const updateVal = (n) =>{
        setVal((v)=>{ return v+n})
    }

    useEffect(()=>{
        setValue(val);
    },[val])



    return (
        <div className="flex">
            <FaMinusSquare className="w-1/3" onClick={()=>{updateVal(-increment)}}/>
            <input type="number" value={val} className=" w-1/3 appearance-none"/>
            <FaPlusSquare className="w-1/3" onClick={()=>{updateVal(increment)}}/>
        </div>
    )

}