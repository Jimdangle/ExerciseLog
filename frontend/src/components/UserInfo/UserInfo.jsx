import { TokenContext } from "../../views/Home"

import { useContext, useEffect, useState } from "react"
export default function UserInfo(){
    const token = useContext(TokenContext);
    const [userInfo, setUserInfo] = useState({email:"",username:""}) // user information 
    

    const [userDisplay, setUserDisplay] = useState({count:0,motion_count:0,motions_top5:[]}) // what and how to display info

    useEffect(()=>{
        GetUserInfo();
        GetUserSummary();
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
                console.log(response)
                const bod = await response.json();
                console.log(bod);
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
                console.log(response)
                const bod = await response.json();
                const {email,username} = bod.user;
                setUserInfo({email:email, username:username});
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async function GetUserSummary(){
        try{
            const response = await fetch('http://localhost:3001/user/summary',{
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
                console.log(response)
                const bod = await response.json();
                const {count, motion_count, motions} = bod.summary;
                const top5 = findTop5(motions);
                setUserDisplay({count:count, motion_count:motion_count,motions_top5:top5});
            }
        }
        catch(e){
            console.log(e);
        }
    }

    

    function findTop5(obj){
        console.log(obj)
        var items = Object.keys(obj).map( (key) => {return [key, obj[key]]});
        items.sort((a,b)=>{ return b[1]-a[1]});

        var top5 = items.slice(0,3).map( (e) => {return e[0]} )
        console.log(top5);
        return top5;
    }

    return(
        <div className="bg-blue-200 rounded-sm mx-8 my-24 px-6 flex flex-col">
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
            
        </div>)
}