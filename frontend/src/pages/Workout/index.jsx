import { useEffect, useState, useContext } from 'react'
import { useRequest } from '../../hooks/requests/useRequest'
import { getLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import ExerciseDisplay from './ExerciseDisplay/ExerciseDisplay'
import { NotificationContext } from '../PageSelector'
export default function Workout(){

    const setNotification = useContext(NotificationContext)

    const log = getLog()
    //const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    
    const {data,error,isLoading,fetchData} = useRequest('/workout/get','p',{workout_id:log});

    useEffect(()=>{
        if(!isLoading)
            fetchData()
    },[])

    useEffect(()=>{
        if(error)
            setNotification(error.message)
    },[error])

    async function refresh(){
        if(!isLoading)
            await fetchData()
    }

    return(
    <div className='text-white'>
        
        
        {data && data.workout && !error?
        <div>
         <p className='text-center my-2'>{data.workout.name}</p> 
         <p className='text-center my-2'>{data.workout.exercises.length}</p>
         <ExerciseDisplay exercises={data.workout.exercises}></ExerciseDisplay>
        </div>
         : <></>}
        
        <ModalContainer>
            {(closeModal,toggleModal) => (
                <Modal title={"Stinker"} isOpen={toggleModal} onClose={closeModal}>
                    <ExerciseList log_id={log} refresh={refresh} closeModal={closeModal}></ExerciseList>
                </Modal>
                
            )}
        </ModalContainer>

        
        
    </div>)
}