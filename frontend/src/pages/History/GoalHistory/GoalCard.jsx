import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard";
import { createTimeObject } from "../../../utility/time";
import ObjectiveCard from "../../Goals/GoalViewing/ObjectiveViewing/ObjectiveCard";
export default function GoalCard({name,id,timeRemaining,objectives,objectiveCompletion}){
    console.log(objectives, typeof objectives)
    return <ExtendoCard header={<Header name={name} objectiveCompletion={objectiveCompletion}/>} body={<Body objectives={objectives} objectiveCompletion={objectiveCompletion}/>} footer={<Footer timeRemaining={timeRemaining}/>} />
}

function Header({name,objectiveCompletion}){
    const overallCompletion = Math.round( (objectiveCompletion.reduce((a,i)=>{return a+i},0)/objectiveCompletion.length))*100;
    return (
    <div className="flex">
        <p className="w-2/3">{name}</p>
        <p className="w-auto">{overallCompletion}%</p>
    </div>)
}   

function Body({objectives,objectiveCompletion,id}){
    return(
        <div>
            {objectives?
                objectives.map((objective,index)=>{
                    return(<ObjectiveCard key={"objCard"+index} target={objective.target} value={objective.value} percentage={objectiveCompletion[index]} />)
                })
                :
                <></>    
            }
            
        </div>
    )
}

function Footer({timeRemaining}){
    const timeObject = createTimeObject(timeRemaining)
    return(
        <>
        {timeRemaining > 0 ?
            <div className="grid grid-cols-12 w-full">
                <p className="col-span-4 text-center">{timeObject.days}D</p>
                <p className="col-span-4 text-center">{timeObject.hours}H</p>
                <p className="col-span-4 text-center">{timeObject.minutes}S</p>
            </div>
            :
            <div className="flex justify-center">
                <p className="text-center">Expired</p>
            </div>
        }
        
        </>
    )
}