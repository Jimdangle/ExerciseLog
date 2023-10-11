import { percentageColorRed } from "../../utils/styleutil";
export default function RecentGoalItem({item}){
    return(
    <div  className="flex flex-col bg-white rounded-md px-2 my-2">
        <div className="grid grid-cols-3">
            <p className="h2-blue justify-self-start">{item.name}</p>
            <p className="text-slate-400 text-center text-sm">{new Date(new Date(item.end) - Date.now()).getDate()} more days</p>
            <p className={"h2-blue text-center " + percentageColorRed(item.data.overall_completion)} >{item.data.overall_completion*100}%</p>
            
        </div>
        <div className="flex flex-col">
            {
                item.objectives.map((obj,index)=>{
                    return (
                    <div key={obj.slice(0,5)+index} className="grid grid-cols-3 mt-3">
                        <p className="text-sm">{obj}</p>
                        <p className="text-center"> {item.data.obj_data[index][0]}/{item.data.obj_data[index][1]} </p> 
                        <p className={"text-center " + percentageColorRed(item.data.percents[index])}>{item.data.percents[index]*100}%</p>
                    </div>
                    )
                })
            }
        </div>
    </div>)
}