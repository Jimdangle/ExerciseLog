import { useEffect, useState, useContext } from 'react'
import useFetch from '../../hooks/requests/useFetch'
import { getLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import { NotificationContext } from '../PageSelector'
export default function Workout(){

    const setNotification = useContext(NotificationContext)

    const log = getLog()
    const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    

    useEffect(()=>{
        
    },[data])
    return(
    <div className='text-white'>
        
        {isLoading ? "Loading Data" : "Done"}
        {data && data.workout ? <p>{data.workout.name}</p> : <></>}

        <ModalContainer>
            {(closeModal,toggleModal) => (
                <Modal title={"Stinker"} isOpen={toggleModal} onClose={closeModal}>
                    <ExerciseList></ExerciseList>
                </Modal>
            )}
        </ModalContainer>
        
    </div>)
}