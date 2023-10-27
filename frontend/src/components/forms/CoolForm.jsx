import { useState } from "react";
import CoolInput from "./inputs/CoolInput";

/**
 * Form made up of CoolInputs, input information passed to us from Logical component
 * @param {{string,Object,function,function,Object}} props
 * @param {string} props.name - name for the form 
 * @param {Object} props.inputs - Object of inputs to render with CoolInputs, contains validation and other misc stuff 
 * @param {function} props.setData - function to set our form data somewhere else 
 * @param {function} props.action - action to perform on form submission 
 * @param {Object} props.animations - Object containing animations for elements
 * @param {string} animations.in_anim - Input animation
 * @param {string} animations.but_anim - Button animation 
 * @returns 
 */
export default function CoolForm({name,inputs,setData,action,animations}){
   const {in_anim, but_anim} = animations;
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
                
                    return <CoolInput animation={in_anim} key={"cf/"+name+"/"+index} name={input_name}  props={inputs[input_name]} setData={handleChange} ></CoolInput>
                })}

                {/* Submit (use form action) */}
                <div className={"flex justify-center " + (but_anim)}>
                    <button className={"button button-e-white disabled:button-d " } disabled={(isValidated)} onClick={action}>Submit {name}</button>
                </div>
        
            </div>
            
        </div>
    )


    
}