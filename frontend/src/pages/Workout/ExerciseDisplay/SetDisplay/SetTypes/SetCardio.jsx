// We will be given a numerical value from the server in seconds, convert that to a  readable time string for a user, distance should be the same
import { convertSecondsTime } from "../../../../../utility/time";
export default function SetCardio({rep_or_time,added_weight}){
    const time_string = convertSecondsTime(rep_or_time);

    return(
        <div className="flex justify-between mx-2">
            <p>({time_string},{added_weight}mi)</p>
        </div>
    )
}