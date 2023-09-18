import LogList from "../components/LogList/LogList";
import LogPage from "../components/LogPage/LogPage";

import {useState, useEffect} from 'react'; 

// Render either the general log list, or if a user clicks on a particular log, render that log only 
export default function LogView({token}){
    const [selectedLog, setSelectedLog] = useState({});
    // Get our initial list from the server
    async function GetList(update){
        
        try{
            const response = await fetch("http://127.0.0.1:3001/workout/ls",{
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
                    update(bod.all)
                }
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    function SelectPage(item){
        console.log(item)
        setSelectedLog(item);
    }



    return (<>
        {console.log(Object.keys(selectedLog).length)}
        {Object.keys(selectedLog).length !==0 ? <LogPage item={selectedLog} SelectPage={SelectPage}></LogPage> : <LogList GetList={GetList} SelectPage={SelectPage} token={token}></LogList>}
    </>)

    
}