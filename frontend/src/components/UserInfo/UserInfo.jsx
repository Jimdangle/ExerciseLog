import { TokenContext } from "../../views/Home"
import { recentSummary } from "../../config/cfUtil";
import { useContext, useEffect, useState } from "react"
import SummaryView from "./SummaryView";
import SummarySettings from "./SummarySettings";
import SummaryCanvas from "./SummaryCanvas";
export default function UserInfo(){
    const token = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState({email:"",username:""}) // user information 

    
    

    const [summary,setSummary] = useState({});
    
    

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
                <h1 className="h2-white">Summary for<span className="info-blue">{userInfo.email} - {userInfo.username}</span></h1>
                

            </div>

            
            
            <SummarySettings update={setSummary}></SummarySettings>
            
            <SummaryView Summary={summary}></SummaryView>
            
            
        </div>)
}