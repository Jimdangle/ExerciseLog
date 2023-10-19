import {useState} from 'react'

export default function ModalContainer({children}){
    const [toggleModal, setToggleModal] = useState(false);
    const openModal = () => {setToggleModal(true)}
    const closeModal = () => {setToggleModal(false)}

    return (
        <div className=''>
            <button className='button button-e-white content-end' onClick={openModal}>Open Modal</button>
            {children(closeModal,toggleModal)}
        </div>
    )
}