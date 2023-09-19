import LogList from "../components/LogList/LogList";
import LogPage from "../components/LogPage/LogPage";

import {useState, useEffect} from 'react'; 

// Render either the general log list, or if a user clicks on a particular log, render that log only 
export default function LogView({token}){
    const [selectedLog, setSelectedLog] = useState("");

    // Sort the initial results by date created
    function sortResults(list){
        return list.sort((a,b)=> {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
    }
    // Get our initial list from the server
    async function GetList(update){
        
        try{
            const response = await fetch("http://127.0.0.1:3001/workout/lsm",{
                method: "GET",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors'
            })

            const bod = await response.json();
            if(response.ok){
                if(bod.all){
                    update(sortResults(bod.all))
                }
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    function SelectPage(item){
        
        setSelectedLog(item);
    }



    return (<>
        
        {Object.keys(selectedLog).length !==0 ? <LogPage item={selectedLog} SelectPage={SelectPage} token={token}></LogPage> : <LogList GetList={GetList} SelectPage={SelectPage} token={token}></LogList>}
    </>)

    
}