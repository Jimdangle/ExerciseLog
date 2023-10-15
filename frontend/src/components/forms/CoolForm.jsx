import { useState } from "react";
import CoolInput from "./inputs/CoolInput";

export default function CoolForm({name,inputs,setData,action}){
    
    // given some inputs {name:,type:, value:, onChange, placeholder}
    // go one by one, animating each one with a fade and drop in
    // when a user finishes typing in a form and hits enter drop the next one in
    // if a field is empty and the user hits backspace remove one (unless at top)
    const [level,setLevel] = useState(0); // our current level
    const [dir,setDir] = useState(0)

  
    //This controls what items are being rendered, 
   function handleKey(event){
     const {key} = event;
     //Enter has been pressed, we validate our event against validators, and increasing the level wont violate our bounds
     if((key==="Enter" ) && inputs[level].validation(event) && level <inputs.length){
        setLevel(level+1)
        setDir(1)
    }

     //Backspace was pressed, We are not the topmost element, 
     if(key==="Backspace" && level>0 && event.target.value.length == 0 ){
        setLevel(level-1)
        setDir(-1)
    }
   }

  

    return(
        <div className=" bg-slate-800 mx-6 rounded-sm flex align-center justify-center">
            <div className="flex-col">
            {inputs.map((input,index)=>{
               
                return <CoolInput key={"cf/"+name+"/"+index} active={false} props={input} setData={setData}  onKey={handleKey} ></CoolInput>
            })}

            {/* Submit (use form action) */}
            {level === inputs.length ? <button className="button button-e-white" onClick={action}>Submit {name}</button> : <></>}
            
            {/* Filler */}
            <div className={`mt-64 w-full text-gun`}>t</div>
            </div>
            
        </div>
    )


    
}