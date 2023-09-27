import { TokenContext } from "../../views/Home"

import { useContext, useEffect, useState } from "react"
import SummaryView from "./SummaryView";
export default function UserInfo(){
    const token = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState({email:"",username:""}) // user information 
    const [userDisplay, setUserDisplay] = useState({count:0,motion_count:0,motions_top5:[]}) // what and how to display info
    
    

    const [startDate,setStartDate] = useState(0)
    const [endDate,setEndDate] = useState(0)

    const rangeTranslate = ["1 Week", "1 Month", "4 Months", "1 Year", "All Time"]

    useEffect(()=>{
        GetUserInfo();
        
    },[])

   


    function setUsername(name){
        const info = userInfo;
        setUserInfo({email:info.email,username:name})
    }

    async function SetUsername(name){
        try{
            const response = await fetch('http://localhost:3001/user/changename',{
                method:"post",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token,
                    'Accept': '*/*'
                },
                mode:'cors',
                body: JSON.stringify({username:name})
            })

            if(response.ok){
                
                const bod = await response.json();
                
                setUsername(bod.user.username);
            }
        }
        catch(e){
            console.log(e)
        }
    }

    async function GetUserInfo(){
        try{
            const response = await fetch('http://localhost:3001/user/info',{
                method:"GET",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token,
                    'Accept': '*/*'
                },
                mode:'cors'
            })

            if(response.ok){
                
                const bod = await response.json();
                const {email,username} = bod.user;
                setUserInfo({email:email, username:username});
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async function GetWholeSummary(){
        try{
            const response = await fetch('http://localhost:3001/user/wsum',{
                method:"POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token,
                    'Accept': '*/*'
                },
                mode:'cors',
                body: JSON.stringify({start:startDate,end:endDate})
            })

            if(response.ok){
                const bod = await response.json();
                console.log(bod);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    
    

    return(
        <div className="bg-blue-200 rounded-sm mx-8 my-24 px-6 flex flex-col  w-auto ">
            <div className="flex flex-row">
                <p>{userInfo.email}</p>
                <input className="mx-6 bg-blue-200" type="text" placeholder={userInfo.username} onFocus={(ev)=>{ev.target.value=""}} onBlur={(ev)=>{SetUsername(ev.target.value)}}></input>
            </div>
            
            <p>{userDisplay.count} - {userDisplay.motion_count}</p>
            <p>Top 3 Workouts</p>
            <ul>
                {userDisplay.motions_top5.map( (item,index) => {
                    return <li className={"font-semibold text-slate-"+String((700-100*index))} key={index}>{index+1}: {item}</li>
                })}
            </ul>
            <div className="mt-6 flex flex-row justify-text-startjustify-items-end">
                <p>Start</p>
                <input type="date" className="ml-2" onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
                <p>End</p>
                <input type="date" className="mr-2" onChange={(e)=>{setStartDate(e.target.valueAsNumber)}}></input>
                <button onClick={GetWholeSummary}>Click</button>
            </div>
            <div className="flex flex-row">
                <p>{new Date(startDate).toString()}</p>
                <p>{new Date(endDate).toString()}</p>
            </div>
            
            <SummaryView ></SummaryView>
            
            
        </div>)
}