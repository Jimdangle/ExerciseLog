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
    

    return(
    <div className='text-white'>
        
        
        {data && data.workout ? <p className='text-center my-2'>{data.workout.name}</p> : <></>}

        <ModalContainer>
            {(closeModal,toggleModal) => (
                <Modal title={"Stinker"} isOpen={toggleModal} onClose={closeModal}>
                    <ExerciseList></ExerciseList>
                </Modal>
            )}
        </ModalContainer>
        
    </div>)
}