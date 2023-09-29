import { TokenContext } from "../../views/Home"
import { recentSummary } from "../../config/cfUtil";
import { useContext, useEffect, useState } from "react"
import SummaryView from "./SummaryView";
import SummarySettings from "./SummarySettings";
export default function UserInfo(){
    const token = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState({email:"",username:""}) // user information 

    
    const savedSummary = localStorage.getItem(recentSummary) ? localStorage.getItem(recentSummary) : {}

    const [summary,setSummary] = useState(JSON.parse(savedSummary));
    

    function SaveSummary(in_summary){
        const string = JSON.stringify(in_summary);
        console.log(in_summary);
        console.log(string)
        localStorage.setItem(recentSummary,string)
        setSummary(in_summary);
    }

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


    
    

    return(
        <div className="rounded-sm mx-8 text-white my-24 px-6 flex flex-col w-auto ">
            <div className="flex flex-row text-center">
                <h1 className="font-semibold text-xl">Summary for<span className="info-green">{userInfo.email} - {userInfo.username}</span></h1>
                

            </div>
            
            <SummarySettings update={SaveSummary}></SummarySettings>
            
            <SummaryView Summary={summary}></SummaryView>
            
            
        </div>)
}