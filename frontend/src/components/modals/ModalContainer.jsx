import {useState} from 'react'

/**
 * Modal Container to control the state of our modal component (could also be described as a boolean display container bc it doesnt just need the modal)
 * @param {{string, children}} props
 * @param {string} props.title - title for the button 
 * @param {children} props.children - **note** react children, do not pass as a property <ModalContainer>{children}</ModalContainer> 
 * @returns 
 */
export default function ModalContainer({title,children}){
    const [toggleModal, setToggleModal] = useState(false);
    const openModal = () => {setToggleModal(true)}
    const closeModal = () => {setToggleModal(false)}

    return (
        <div className='flex justify-center'>
            <button className='button button-e-white content-end' onClick={openModal}>{title}</button>
            {children(closeModal,toggleModal)}
        </div>
    )
}