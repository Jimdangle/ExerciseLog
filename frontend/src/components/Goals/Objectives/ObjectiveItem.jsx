import { TranslateType } from "../../../utils/goalutil"
export default function ObjectiveItem({objective}){



    return (
    <div>
        <p><span className="text-green-400 font">{TranslateType(objective.context)}</span> --<span className="text-white">{Object.values(objective.target)}</span>-- <span className="text-red-400">{objective.value}</span></p>
    </div>)
}