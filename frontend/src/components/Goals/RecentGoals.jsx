
import { TokenContext } from "../../views/Home";
import { useContext , useEffect,useState} from "react";
import RecentGoalItem from "./RecentGoalItem";

export default function RecentGoals(){
    const token = useContext(TokenContext);
    const [recentGoals,setRecentGoals] = useState([])
    const [count,setCount] = useState(3);
    const [sliderDisabled, setSliderDisabled] = useState(false)

    function sliderCooldown(){ //without this everytime the slider moves they can make a request to the server that taxes the  db,
        setTimeout(()=>{setSliderDisabled(false)},200)
    }

    useEffect(()=>{
        
        RecentGoals();
    },[count])

    async function RecentGoals(){
        
        try{
            setSliderDisabled(true);
            const response = await fetch('http://localhost:3001/goals/rec',{
                method: "POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({n:count})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
                sliderCooldown();
                setRecentGoals(bod.goal_data)
                
            }
        }
        catch(e)
        {
            console.log(e.message)
        }
    }
   

    return ( ( recentGoals ) ? 
                <div className=" mx-2 mt-4 flex flex-col bg-slate-600 rounded-md shadow-md p-2">
                    <p className="h2-blue text-center">Recent Goals <span className="text-slate-400">({count}/10)</span></p>
                    <div className="flex flex-row">
                        {/* Slider for rendering # of goals */}
                       
                        <input disabled={sliderDisabled} className="w-10 h-24 rotate-180" style={{appearance: "slider-vertical"}} type="range" min={1} max={10} step={1} value={count} onChange={(e)=>{console.log(count); setCount(e.target.value)}}></input>
                        
                        
                        <div className="flex flex-col">
                            {recentGoals.map((item,index)=>{
                                return (<RecentGoalItem item={item} key={"rcgi"+index}></RecentGoalItem>)
                            })}
                        </div>
                        
                    </div>
                    
                </div>
                :
                <p className="info-red">Could not load recent goals</p>
    )


}