import './modals.css'
import '../../styles/animations.css'
import { IoIosCloseCircleOutline } from "react-icons/io";

/**
 * General Modal component to display content
 * @param {{string,boolean,function,components}} props  
 * @param {string} props.title - title for the modal container 
 * @param {boolean} props.isOpen - boolean to display or hide content 
 * @param {function} props.onClose - function to perform when modal closes 
 * @param {components} props.children - **note** do not pass this as a property but rather inbetween the component tags <Modal ...props>{children go here}</Modal> 
 * @component
 */
export default function Modal({title, isOpen, onClose, children}){

    return (
        <div>
            <div className={'modal-card '+(isOpen ? ' modal-drop' : ' hidden')}>
                <div className="flex">
                    <p className="modal-title">{title}</p>
                    <IoIosCloseCircleOutline onClick={onClose}></IoIosCloseCircleOutline>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <div className={(isOpen? 'modal-cover': 'hidden')}></div>
        </div>
    )
}