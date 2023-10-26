import EditableList from "../../../../components/lists/EditableList/EditableList";
import { useMemo, useContext, useEffect, useState } from "react";
import {useRequest} from '../../../../hooks/requests/useRequest'
import { RefreshContext } from "../..";
import CoolForm from "../../../../components/forms/CoolForm";

/**
 * Component to display sets 
 * @param {{Object}} props - main property object
 * @param {Object} props.exercise - Exercise Object returned from outer get request
 * @component
 * @description Render sets from an exercise and allow us to remove, and add more sets onto it
 */
export default function SetDisplay({exercise}){

    const refresh = useContext(RefreshContext)
    const [sets,setSets] = useState([]);
    

    

    //Make our request to remove the set from the list 
    const {data:removeData,isLoading:removeLoading,error:removeError,fetchData:removeFetch} = useRequest('/workout/remSet', 'x', {exercise_id:exercise._id})
    const {data:addData, isLoading:addLoading, error:addError, fetchData:addFetch} = useRequest('/workout/addSet', 'p', {exercise_id:exercise._id})


    // request to fetch our sets for this exercise
    const {data:getData, isLoading:getIsLoading, error:getError, fetchData:getFetch} = useRequest('/workout/getEx', 'p', {exercise_id:exercise._id})
    
    // One use effect for when data is changed
    useEffect(()=>{
        if(getData && getData.exercise){
            setSets(getData.exercise.sets)
        }
    },[getData])
    //use effect to get data first
    useEffect(()=>{
        getFetch();
        if(getData && getData.exercise){
            setSets(getData.exercise.sets)
        }
    },[])

    /**
     * removeAction for our editable list
     * @param {Object} object - object from the list to remove
      */
    async function remove(object){
        await removeFetch({set_id:object._id})
        await getFetch();
    }

   


    const [state,setData] = useState({"Reps": 0,"Weight": 0})
    const payload = {rep_or_time: state['Reps'], added_weight: state['Weight']}
    //Form inputs 
    const inputs = {
        "Reps":{
            
            type: "number",
            value: state['Reps'],
            validation: (v)=>{return v>0},
            placeholder:"Reps",
            error: "Make sure reps are greater than 0"
        },
        "Weight":{
           
            type: "number",
            value: state['Weight'],
            validation: (v)=>{return (v > -1 && v < 1000);},
            placeholder:"Weight",
            error: "Make sure weight is atleast 0"
        },
    }

    async function add(){
        await addFetch(payload)
        getFetch();
    }

    return (
        <div>
            <EditableList title={"Sets"} list={sets} removeAction={remove} componentType={SetComponent}/>
            <CoolForm name={"Set Input"} inputs={inputs} setData={setData} action={add} animations={{in_anim:'',but_anim:''}} ></CoolForm>
        </div>
        
    )
}


/**
 * In house component that serves as the class the editable list will render for us
 * @param {{number,number}} props 
 * @param {number} props.rep_or_time - rep or time value from the set
 * @param {number} props.added_weight - additional weight for the exercise
 * @description **Note** these parameters match the set object we are sending to editable list
 */
function SetComponent({rep_or_time,added_weight}){
    return (
        <div className="flex justify-between">
            <p className="text-end">{rep_or_time}</p>
            <p className="text-center">{added_weight}</p>
        </div>
    )
}