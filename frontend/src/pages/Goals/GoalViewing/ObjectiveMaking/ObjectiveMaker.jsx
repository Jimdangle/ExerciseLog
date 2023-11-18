import DropInput from "../../../../components/forms/inputs/DropInput";
import { useState, useMemo, useEffect } from "react";
import TotalObjectives from "./TotalObjectives";
import VolumeObjectives from "./VolumeObjectives";
import ExerciseObjectives from "./ExerciseObjectives";
import IncrementalInput from '../../../../components/forms/inputs/IncrementalInput'
import { useRequest } from "../../../../hooks/requests/useRequest";
export default function ObjectiveMaker({goal_id, refresh}){
    //Readable names, values represent what we should attach to what ever else we get from the input type to make our search spec
    const inputs = [
        {name:'Totals', value: 0},
        {name:'Exercises', value:1},
        {name:'Volumes', value:2}
    ]

    const [spec,setSpecs] = useState([]);
    const [value,setValue] = useState(0)
    const setSpec = (value)=>{setSpecs(value)}
    const wipeSpec = () => {setSpecs([])}
    const [objType,setObjType] = useState(0)
    const onChange = (event) => { 
        wipeSpec();
        setValue(0);
        setObjType(event.target.value)
    }

    useEffect(()=>{ //update to the spec was really only for testing this will get deleted
        console.log(spec)
    },[spec])

    const {data:addData,loading:addLoading,fetchData:addFetch} = useRequest('/goals/addObj','p') 
    
    const canAdd = ((spec && value > 0) && !addLoading)
    async function addObjective(){
        if(canAdd){
            await addFetch({goal_id:goal_id,target:spec,value:value})
            await refresh();
        }
    }

    const AdderComponent = useMemo(()=>{
        switch(Number(objType)){
            case 0:
                return <TotalObjectives setSpec={setSpec}/>
            case 1:
                return <ExerciseObjectives setSpec={setSpec}/>
            default:
                return <VolumeObjectives setSpec={setSpec}/>
            
        }
    },[objType])

    const valueChange = (event) =>{
        setValue(event.target.value)
    }

    const bound = () => {
        return 100*Math.pow(10,objType) // So my thinking here is if its a total (workouts, exercises, sets) it might be <= 100, exercise weight values will prob be <= 1000 for a single exercise, volumes will will be a lot larger
    }

    return(
        <div className="w-1/2 ml-[25%] py-2">
            <p className="text-lg py-2 font-semibold">Objective Adder</p>
            <DropInput name="root_spec" value={objType} onChange={onChange} items={inputs} styles="input-dd-gun" label="Type of Objective"/>
            {AdderComponent}
            <IncrementalInput name="value" label="Set a Value" value={value} min={0} max={bound()} onChange={valueChange} step={Math.pow(5,objType)} styles='my-2' bolded={false}/>
            <div className="flex justify-center">
                <button className="button button-e-white disabled:button-d" disabled={!canAdd} onClick={addObjective}>Add Objective</button>
            </div>
        </div>
    )
}