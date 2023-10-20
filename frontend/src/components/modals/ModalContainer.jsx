import {useState} from 'react'

export default function ModalContainer({title,children}){
    const [toggleModal, setToggleModal] = useState(false);
    const openModal = () => {setToggleModal(true)}
    const closeModal = () => {setToggleModal(false)}

    return (
        <div className=''>
            <button className='button button-e-white content-end' onClick={openModal}>{title}</button>
            {children(closeModal,toggleModal)}
        </div>
    )
}