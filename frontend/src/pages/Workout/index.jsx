import { useEffect, useState, useContext,createContext } from 'react'
import { useRequest } from '../../hooks/requests/useRequest'
import { getLog,removeLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import ExerciseDisplay from './ExerciseDisplay/ExerciseDisplay'
import { NotificationContext, PageContext } from '../PageSelector'
import MotionModal from './MotionAdder/MotionModal'

export const RefreshContext = createContext(null);
/**
 * Display information for our currently stored workout. Render exercise info and set info 
 * @component
 */
export default function Workout(){

    const setNotification = useContext(NotificationContext)
    const setPage = useContext(PageContext)
    const log = getLog()

    //const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    
    const {data,error,isLoading,fetchData} = useRequest('/workout/get','p',{workout_id:log});

    useEffect(()=>{
        if(!isLoading)
            fetchData()
    },[])

    useEffect(()=>{
        if(error)
        {
            // We have an old log
            if(error.code===404){
                removeLog();
                setPage(0);
            }
            console.log(error)
            setNotification('Error Loading Workout\n\t' + error.message + '\n\tcode:' + error.code)
        }
    },[error,data])

    async function refresh(){
        if(!isLoading)
            await fetchData()
    }

    return(
    <RefreshContext.Provider value={refresh}>
        <div className='text-white'>
            
            
            {data && data.workout && !error?
            <div>
            <p className='text-center my-2'>{data.workout.name}</p> 
            <p className='text-center my-2'>{data.workout.exercises.length}</p>
            <ExerciseDisplay exercises={data.workout.exercises}></ExerciseDisplay>
            </div>
            : <></>}
            
            {/* Exercise Adding */}
            <ModalContainer title={"Add Exercise"}>
                {(closeModal,toggleModal) => (
                    <Modal title={"Stinker"} isOpen={toggleModal} onClose={closeModal}>
                        <ExerciseList log_id={log} refresh={refresh} closeModal={closeModal}></ExerciseList>
                    </Modal>
                    
                )}
            </ModalContainer>

            <MotionModal/>
            
            
        </div>
    </RefreshContext.Provider>)
}