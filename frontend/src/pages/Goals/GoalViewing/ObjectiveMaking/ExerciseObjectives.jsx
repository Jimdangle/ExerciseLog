import {useRequest} from '../../../../hooks/requests/useRequest'
import DropInput from '../../../../components/forms/inputs/DropInput';
import { useEffect,useMemo, useState } from 'react';
//This one is gonna be a tad more complicated
// We want to provide a list of exerices (techincally the motion name) to the user 
// Then provide the options they can set for an exercise
// - # of sets
// - Rep/Time value, Weight/Distance value
export default function ExerciseObjectives({setSpec}){
    const {data,loading,fetchData} = useRequest('/motion/lsa');
    const [subSpec, setSub] = useState({motion:'',target:''});
    useEffect(()=>{
        fetchData();
        
    },[])

    
    const motionInputs = useMemo(()=>{
        
        if(data && data.motions){
            setSub({motion:data.motions[0].name, target:'n'})
            return data.motions.map((motion)=>{return {name:motion.name,value:motion.name}})
        }
    },[data])

    const pickMotion = (event) =>{setSub({...subSpec,motion:event.target.value})}
    const pickTarget = (event) =>{setSub({...subSpec,target:event.target.value})}

    useEffect(()=>{
        const target = (subSpec.target.indexOf(',') >= 0) ? subSpec.target.split(',') : subSpec.target;
        console.log(subSpec)
        setSpec(['exercise_summary',subSpec.motion,...target])
    },[subSpec])



    const targetInputs = [
        {name: 'Set Count', value: 'n'},
        {name: 'Rep/Time Value', value: ['values','max','0']},
        {name: 'Weight/Distance', value: ['weight','max','0']},

    ]
    return (
        <div>
            {motionInputs ?
                <DropInput name="Exercises" items={motionInputs} onChange={pickMotion} label="Pick an Exercise" styles="input-dd-gun"/>
                :
                <></>
            }
            {subSpec.motion !=='' ?
                <DropInput name="Exercises" items={targetInputs} onChange={pickTarget} label="Pick an Exercise" styles="input-dd-gun"/>
                :
                <></>
            }
        </div>
    )

}