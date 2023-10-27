import '../../styles/animations.css'
import { IoIosCloseCircleOutline } from "react-icons/io";

/**
 * Notification component to render notifications on the screen, very similar to a modal
 * @param {{string, function}} props
 * @param {string} props.message - message to display on the notification
 * @param {function} props.onClose - function to perform when closed 
 * @component 
 */
export default function Notification({message,onClose}){
    const display = ( message !== "" )
    return (
        <div className={"absolute top-5 w-2/3 left-[16.666667%] rounded-sm bg-white text-gun " + (display ? ' modal-drop' : ' hidden')}>
            <p >{message}</p>
            <IoIosCloseCircleOutline  onClick={onClose}></IoIosCloseCircleOutline>
        </div>
    )
}