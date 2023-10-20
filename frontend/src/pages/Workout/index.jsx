import { useEffect, useState, useContext , useMemo} from 'react'
import useFetch from '../../hooks/requests/useFetch'
import { getLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import { NotificationContext } from '../PageSelector'
import SearchableList from '../../components/lists/SearchableList/SearchableList'
export default function Workout(){

    const setNotification = useContext(NotificationContext)

    

    const log = getLog()
    const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    

    

    useEffect(()=>{
        if(error){console.log(error)}
        console.log(data)
    },[data,error])


    const exercises = useMemo(()=>{
        if(data && data.workout.exercises){
            console.log(data.workout.exercises)
            return data.workout.exercises.map( (exercise) => {
                const motion = exercise.motion.motion ? exercise.motion.motion : exercise.motion.umotion
                return {_id:exercise._id,name:motion.name, sets:exercise.sets}
            } )
        }
    },[data])


    
    return(
    <div className='text-white'>
        
        {isLoading ? "Loading Data" : "Done"}
        {data && data.workout ? <p>{data.workout.name}</p> : <></>}

        <ModalContainer title={"Add Exercise"}>
            {(closeModal,toggleModal) => (
                <Modal title={"Pick An Exercise"} isOpen={toggleModal} onClose={closeModal}>
                    <ExerciseList id={(data ? data.workout._id : '')}></ExerciseList>
                </Modal>
            )}
        </ModalContainer>
        
        {exercises ? 
            <SearchableList title={"Current Exercises"} list={exercises} action={(id)=>{console.log(id)}} fields={{display_field:'name',action_field:'_id'}}></SearchableList> 
            :
            <></>
        }
        


    </div>)
}