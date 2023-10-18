/* This Controls the logic around Jumping back into a most recent workout */
import { getLog } from "../../../utility/storage";
import { PageContext } from "../../PageSelector";
import { useContext } from "react";
export default function JumpIn(){
    const curLog = getLog() 
    const setPage = useContext(PageContext);
    console.log(curLog)
    return (
        <div>
            <p className="text-white">Want to jump back in?</p>
            <button className="button-e-blue disabled:button-d" disabled={curLog === null ? true : false} onClick={()=>{console.log('suh');setPage(1)}}>Last Workout </button>
        </div>
    )
}