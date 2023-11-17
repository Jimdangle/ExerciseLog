import DropInput from "../../../../components/forms/inputs/DropInput";
import { useState, useMemo } from "react";
import TotalObjectives from "./TotalObjectives";
import VolumeObjectives from "./VolumeObjectives";

export default function ObjectiveMaker(){
    //Readable names, values represent what we should attach to what ever else we get from the input type to make our search spec
    const inputs = [
        {name:'Totals', value: 0},
        {name:'Volumes', value:1},
        {name:'Exercise', value:2}
    ]

    const [spec,setSpecs] = useState([]);
    const setSpec = (value)=>{setSpecs(value)}
    const wipeSpec = () => {setSpecs([])}
    const [objType,setObjType] = useState(0)
    const onChange = (event) => { 
        wipeSpec();
        setObjType(event.target.value)
    }

    console.log(spec)
   

    const AdderComponent = useMemo(()=>{
        switch(Number(objType)){
            case 0:
                return <TotalObjectives setSpec={setSpec}/>
            case 1:
                return <VolumeObjectives setSpec={setSpec}/>
        }
    },[objType])

    

    return(
        <div>
            <p className="text-lg py-2">Objective Adder</p>
            <DropInput name="root_spec" value={objType} onChange={onChange} items={inputs} styles="input-dd-gun" label="Type of Objective"/>
            {AdderComponent}
        </div>
    )
}