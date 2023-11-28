import { useEffect, useState, useContext,createContext } from 'react'
import { useRequest } from '../../hooks/requests/useRequest'
import { getLog,removeLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import ExerciseList from './ExerciseList/ExerciseList'
import ExerciseDisplay from './ExerciseDisplay/ExerciseDisplay'
import { NotificationContext, PageContext } from '../PageSelector'
import MuscleOverlayContainer from '../Summary/MuscleOverlayContainer'
export const RefreshContext = createContext(null);
export const SummaryContext = createContext(null);
/**
 * Display information for our currently stored workout. Render exercise info and set info 
 * @component
 */
const muscleData = {
    'Traps': 0,
    'Lats': 1.5,
    'Upper Pectorals': 2,
    'Rear Deltoids': 3,
    'Hamstrings': 1.5,
    'Glutes': 3,
    'Obliques': 2,
    'Abs': 0,
}
export default function Workout(){


    
    const setNotification = useContext(NotificationContext)
    const setPage = useContext(PageContext)
    const log = getLog()

    //const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    
    const {data,error,isLoading,fetchData} = useRequest('/workout/get','p',{workout_id:log});
    const {data:sumData, error:sumError,isLoading:sumLoading, fetchData:sumFetch} = useRequest('/user/wsum', 'p')

    useEffect(()=>{
        if(!isLoading)
            fetchData()
    },[])

    useEffect(()=>{
        if(data){
            sumFetch({start:data.workout.createdAt, end:data.workout.createdAt})
        }
    },[data])


    useEffect(()=>{
        if(error)
        {
            // We have an old log
            if(error.code===404){
                removeLog();
            }
            console.log(error)
            setPage(0); // set our page back to the home page
            setNotification('This workout does not exist, or has been corrupted\n\t')
        }
    },[error])

    async function refresh(){
        if(!isLoading)
            await fetchData()
    }

    return(
    <SummaryContext.Provider value={()=>{sumFetch({start:data.workout.createdAt, end:data.workout.createdAt})}}>
    <RefreshContext.Provider value={refresh}>
        <div className='text-white'>
            
            
            {data && data.workout && !error?
            <div>
            <p className='text-center my-2'>{data.workout.name}</p> 
            <p className='text-center my-2'>{data.workout.exercises.length}</p>
            <ExerciseDisplay exercises={data.workout.exercises} refresh={refresh}></ExerciseDisplay>
            </div>
            : <></>}
            
            {/* Exercise Adding */}
            <ModalContainer title={"Add Exercise"}>
                {(closeModal,toggleModal) => (
                    <Modal title={"Pick A Motion"} isOpen={toggleModal} onClose={closeModal}>
                        <ExerciseList log_id={log} refresh={refresh} closeModal={closeModal}></ExerciseList>
                    </Modal>
                    
                )}
            </ModalContainer>

            {sumData && sumData.summary ? 
            <MuscleOverlayContainer sumData={sumData}/>
            :
            <></>
            }
           
           
            
        </div>
    </RefreshContext.Provider>
    </SummaryContext.Provider>
    )
}