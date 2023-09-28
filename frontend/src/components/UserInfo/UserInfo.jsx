import { TokenContext } from "../../views/Home"

import { useContext, useEffect, useState } from "react"
import SummaryView from "./SummaryView";
import SummarySettings from "./SummarySettings";
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
            
            <SummarySettings GetWholeSummary={GetWholeSummary}></SummarySettings>
            
            <SummaryView ></SummaryView>
            
            
        </div>)
}