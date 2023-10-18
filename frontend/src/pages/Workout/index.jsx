import { useEffect, useState } from 'react'
import useFetch from '../../hooks/requests/useFetch'
import { getLog } from '../../utility/storage'
import Modal from '../../components/modals/Modal'
import ModalContainer from '../../components/modals/ModalContainer'
import CoolForm from '../../components/forms/CoolForm'
import LSMain from '../SignupLogin'
export default function Workout(){
    const log = getLog()
    const {data,isLoading,error } = useFetch('/workout/get', "p", {'workout_id':log})
    const [state,setState] = useState({'Test':''})
    const inputs = {
        "Test": {
            type: 'text',
            value: state['Test'],
            validation: (v)=>{return true},
            error: ''
        }
    }

    useEffect(()=>{},[data])
    return(
    <div className='text-white'>
        
        {isLoading ? "Loading Data" : "Done"}
        {data && data.workout ? <p>{data.workout.name}</p> : <></>}

        <ModalContainer>
            {(closeModal,toggleModal) => (
                <Modal title={"Stinker"} isOpen={toggleModal} onClose={closeModal}>
                    <p>Testing 123</p>
                </Modal>
            )}
        </ModalContainer>
        
    </div>)
}