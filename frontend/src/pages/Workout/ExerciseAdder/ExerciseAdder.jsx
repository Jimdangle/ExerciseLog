import TextInput from "../../../components/forms/inputs/TextInput";
import DropInput from "../../../components/forms/inputs/DropInput";
import SliderInput from "../../../components/forms/inputs/SliderInput";
import ModalContainer from "../../../components/modals/ModalContainer"
import Modal from "../../../components/modals/Modal"
import MuscleList from "./MuscleList";

import {useState, useEffect, useMemo} from 'react'
import { useRequest } from "../../../hooks/requests/useRequest";
export default function ExerciseAdder({}){
    
    const [state,setState] = useState({name:'',type:0,muscles:null,desc:''});
    const {data:muscleData,isLoading,error:muscleError,fetchData:muscleFetch} = useRequest('/motion/musc');
    
    const muscleSum = useMemo(()=>{
        if(state.muscles){
            const out = Object.keys(state.muscles).reduce((acum,key)=>{return acum + state.muscles[key]},0)
            console.log(`Sum of mucsles: ${out}`)
            return out;
        }
        return 0;
    },[state.muscles])
  

    useEffect(()=>{
        muscleFetch();

    },[])

    

    // update the normal easy values
    const onChange = (event) => {setState({...state,[event.target.name]:event.target.value})}
    const changeMuscles = (event) => { // Update our muscle values from the sliders
        const curVal = state.muscles[event.target.name] ? Number(state.muscles[event.target.name]) : 0;
        if(muscleSum + Number(event.target.value) - curVal <= 1 ){
            setState((old)=> {
                return {...old, muscles:{...old.muscles,[event.target.name]: Number(event.target.value)}}
            })
    
        }
    }
    const addMuscle = (muscle) => {setState({...state,muscles:{...state.muscles,[muscle]:0}})}


    
    const dropDownOptions = [
        {name: "Lift", value: 0},
        {name: "Cardio", value: 1},
        {name: "Hold", value: 2}
    ]

    return(
        <div>
            <TextInput name="name" styles="text-gun" value={state.name} onChange={onChange}/>
            <DropInput name="type" styles="text-gun" value={state.type} onChange={onChange} items={dropDownOptions}/>
            {
                state.muscles ? 
                Object.keys(state.muscles).map((item)=>{
                    console.log(state.muscles[item])
                   return <SliderInput key={item+"mli"} name={item} value={state.muscles[item]} onChange={changeMuscles} min={0} max={1} step={0.05}/>
                })
                :
                <></>
            }
            
            {muscleData && muscleData.muscles ? 
                <ModalContainer title={"Add Muscle"}>
                     {(closeModal,toggleModal) => (
                        <Modal title={"Add Muscle"} isOpen={toggleModal} onClose={closeModal}>
                           <MuscleList list={muscleData.muscles} action={addMuscle}/>
                        </Modal>
                    )}
                </ModalContainer>
                :<></>
            }
        </div>
    )

}