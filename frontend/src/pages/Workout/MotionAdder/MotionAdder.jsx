import TextInput from "../../../components/forms/inputs/TextInput";
import DropInput from "../../../components/forms/inputs/DropInput";
import SliderInput from "../../../components/forms/inputs/SliderInput";
import ModalContainer from "../../../components/modals/ModalContainer"
import Modal from "../../../components/modals/Modal"
import MuscleList from "./MuscleList";

import {FaTrash} from 'react-icons/fa6'
import {useState, useEffect, useMemo} from 'react'
import { useRequest } from "../../../hooks/requests/useRequest";
export default function MotionAdder({closeModal,getData}){
    
    const [state,setState] = useState({name:'',type:0,muscles:null,desc:''});
    const {data:muscleData,isLoading,error:muscleError,fetchData:muscleFetch} = useRequest('/motion/musc');
    const {data:addData, isLoading:addLoading, error:addError, fetchData:addFetch} = useRequest('/motion/add', 'p', {name:state.name,type:state.type,muscles:state.muscles,desc:state.desc})
    const muscleSum = useMemo(()=>{ // if we have changed our muscles and have muscles to look at calculate the sum
        if(state.muscles){
            const out = Object.keys(state.muscles).reduce((acum,key)=>{return acum + state.muscles[key]},0)
            return out;
        }
        return 0;
    },[state.muscles])
  

    useEffect(()=>{ // get all the muscles on init
        muscleFetch();

    },[])

    

    // update the normal easy values
    const onChange = (event) => {setState({...state,[event.target.name]:event.target.value})}
    const changeMuscles = (event) => { // Update our muscle values from the sliders
        const curVal = state.muscles[event.target.name] ? Number(state.muscles[event.target.name]) : 0; // see if we have a value for the updated one
        if(muscleSum + Number(event.target.value) - curVal <= 1 ){ // ensure we are under or equal to one
            setState((old)=> {
                return {...old, muscles:{...old.muscles,[event.target.name]: Number(event.target.value)}} // update old state
            })
    
        }
    }
    const addMuscle = (muscle) => { // add in a new muscle and set it to 0
        setState({...state,muscles:{...state.muscles,[muscle]:0}}) 
    }

    const removeMuscle = (muscle) => { // Remove Muscle from the muscle object 
        setState((old)=>{ // get the old one 
            const copy = {...old}; // copy it 
            delete copy.muscles[muscle]; // delete the muscle we dont want 
            return {...copy}; // return the modified version 
        })
    }

    
    async function addMotion(){
        await addFetch();
        await getData();
        closeModal();
    }



    // Options for our drop down select input
    const dropDownOptions = [
        {name: "Lift", value: 0},
        {name: "Cardio", value: 1},
        {name: "Hold", value: 2}
    ]

    return(
        <div>
            <p>Name</p>
            <TextInput name="name" styles="text-gun" value={state.name} onChange={onChange}/>
            <p>Type</p>
            <DropInput name="type" styles="text-gun" value={state.type} onChange={onChange} items={dropDownOptions}/>
            {
                state.muscles ? 
                    Object.keys(state.muscles).map((item, index)=>{
                        //console.log(state.muscles[item])
                    return(
                        <div key={item+"mli"} className="flex ">
                            <SliderInput inStyle="bg-gun"  name={item} label={item} value={state.muscles[item]} onChange={changeMuscles} min={0} styles="my-2 w-[80%]" max={1} step={0.05}/>
                            <FaTrash className="mx-2" onClick={()=>{removeMuscle(item)}}/>
                        </div>
                    )})
                    :
                    <></>
            }
            
            {
                muscleData && muscleData.muscles ? 
                    <MuscleList list={muscleData.muscles} action={addMuscle} />
                    :
                    <></>       
            }

            <div className="flex justify-center">
                <button onClick={addMotion} className="button button-e-green">Add</button>
            </div>
        </div>
    )

}