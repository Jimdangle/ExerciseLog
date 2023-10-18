import './modals.css'
import '../../styles/animations.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
export default function Modal({title, isOpen, onClose, children}){

    return (
        <div>
            <div className={'modal-card '+(isOpen ? ' grow' : 'hidden')}>
                <div className="flex">
                    <p className="modal-title">{title}</p>
                    <IoIosCloseCircleOutline onClick={onClose}></IoIosCloseCircleOutline>
                </div>
                <div>
                    {children}
                </div>
            </div>
            <div className={(isOpen? 'absolute top-0 left-0 bg-gun opacity-80 w-screen h-screen z-20': 'hidden')}></div>
        </div>
    )
}