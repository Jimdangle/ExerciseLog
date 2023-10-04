import { TranslateType } from "../../../utils/goalutil"
export default function ObjectiveItem({objective}){



    return (
    <div>
        <p><span className="text-green-400 font">{TranslateType(objective.context)}</span> --{Object.keys(objective.target).map((item,index)=>{return <span key={index+"l"+index} className="text-white">{item}: {objective.target[item] }</span>})}-- <span className="text-red-400">{objective.value}</span></p>
    </div>)
}