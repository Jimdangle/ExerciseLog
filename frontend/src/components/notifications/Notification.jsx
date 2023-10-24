/* A notification component for rendering hints, or helpful notifications lmao
    I am thinking it will need some kind of controller / dispatcher 
    That controller should be able to close and open the notification but instead of a button like modal
    we just want to be able to share some function others can use to turn it on

    okay honestly I just want a single notification to be able to be dropped down from the main screen
*/
import '../../styles/animations.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
export default function Notification({message,onClose}){
    const display = ( message !== "" )
    return (
        <div className={"absolute top-5 w-2/3 left-[16.666667%] rounded-sm bg-white text-gun " + (display ? ' modal-drop' : ' hidden')}>
            <p >{message}</p>
            <IoIosCloseCircleOutline  onClick={onClose}></IoIosCloseCircleOutline>
        </div>
    )
}