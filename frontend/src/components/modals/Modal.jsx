import './modals.css'
import '../../styles/animations.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
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