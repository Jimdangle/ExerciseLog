import { useEffect, useState, useContext } from 'react'
import { useRequest } from '../../hooks/requests/useRequest'
import { getLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import { NotificationContext } from '../PageSelector'
export default function Workout(){

    const setNotification = useContext(NotificationContext)

    const log = getLog()
    //const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    
    const {data,error,isLoading,fetchData} = useRequest('/workout/get','p',{workout_id:log});

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        if(error)
            setNotification(error.message)
    },[error])

    function refresh(){
        console.log('refreshing!')
        fetchData()
    }

    return(
    <div className='text-white'>
        
        
        {data && data.workout && !error?
        <div>
         <p className='text-center my-2'>{data.workout.name}</p> 
            {data.workout.exercises ? 
                data.workout.exercises.map((item) => {
                    return <p key={`${item._id}`}>{(item.motion.motion ? item.motion.motion.name : item.motion.umotion.name)}</p>
                })
                :
                <></> 
            }
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