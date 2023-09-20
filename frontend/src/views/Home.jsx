import lsPrefix from "../config/cfUtil"
import LogList from "../components/LogList/LogList";
import LogPage from "../components/LogPage/LogPage";
import { createContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
//Home Show recent workouts and let user edit items in the list
// Two Components I think
// 1) Log List : displays a list of workout logs with edit buttons and delete buttons
// 2) Log Adder : Let the user add a new workout log, name it and press some continue button

export const TokenContext = createContext(null);

export default function Home({signout}){
    const logout = () => {
        localStorage.removeItem(lsPrefix+"actk");
        signout();
        console.log("fuck")
    }

    const [page, setPage] = useState(0);

    function SetPage(pg){setPage(pg)}
    function pp(arg){console.log(arg)}
    //0:Home
    //1:Log View
    //2:Settings

    
    function SelectPage(){
        console.log(`Page swapped to ${page}`);
        switch(page){
        case 1: 
            console.log("Should return LogPage! if not react is gay")
            return <LogPage SelectPage={SetPage}></LogPage>
        default:
            console.log("Should return LogList")
            return <LogList SelectPage={SetPage}></LogList>
        }
        
    }

    const token = localStorage.getItem(lsPrefix+"actk");
    

    useEffect(()=>{
        console.log(`useEffect in home.jsx ${page}`);
       SelectPage()
        
    },[page])
    

    return(
        <>
        
        <NavBar SetPage={SetPage} logout={logout}></NavBar>
       <div className="md:mobile_middle lg:desktop_middle">
            <TokenContext.Provider value={token}>
                {SelectPage()}
            </TokenContext.Provider>
        </div>
        
        
        </>
    )
}

