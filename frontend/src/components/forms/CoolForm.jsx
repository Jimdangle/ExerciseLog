import { useState } from "react";
import CoolInput from "./inputs/CoolInput";

export default function CoolForm({name,inputs,setData,action}){
    
   const [error,setError] = useState("")

   function handleChange(event){
     const target = event.target;
     setData( (old_data) => {
        return {
            ...old_data,
            [target.name]: target.value
        }});
    
   }
   
   const valid = Object.keys(inputs).map( (key) => {
     if(inputs[key].validation(inputs[key].value) && inputs[key].value.length > 0) //our data is valid 
     {
        return 0
     }
     else{
        return 1 //data is not valid
     }
   })

   const isValidated = valid.reduce((a,v) => {return a+v})


  

    return(
        <div className="form-container">
            <div className="flex-col">
                <p className="absolute">{error}</p>
                {Object.keys(inputs).map((input_name,index)=>{
                
                    return <CoolInput key={"cf/"+name+"/"+index} name={input_name}  props={inputs[input_name]} setData={handleChange} ></CoolInput>
                })}

                {/* Submit (use form action) */}
                <div className="flex justify-center slideb ">
                    <button className="button button-e-white disabled:button-d  slideb" disabled={(isValidated)} onClick={action}>Submit {name}</button>
                </div>
        
            </div>
            
        </div>
    )


    
}