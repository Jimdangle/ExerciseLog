import lsPrefix from "../config/cfUtil"
import LogList from "../components/LogList/LogList";
import LogPage from "../components/LogPage/LogPage";
import UserInfo from "../components/UserInfo/UserInfo";
import { createContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Goals from '../components/Goals/Goals'

import { recentPage } from "../config/cfUtil";
//Home Show recent workouts and let user edit items in the list
// Two Components I think
// 1) Log List : displays a list of workout logs with edit buttons and delete buttons
// 2) Log Adder : Let the user add a new workout log, name it and press some continue button

export const TokenContext = createContext(null);
export const PageContext = createContext(null);

export default function Home({signout,test}){
    const logout = () => {
        localStorage.removeItem(lsPrefix+"actk");
        signout();
        
    }

    const savedPage = localStorage.getItem(recentPage) ?  Number(localStorage.getItem(recentPage)) : 0;

    function SaveRecentPage(page){
        localStorage.setItem(recentPage,String(page))
    }
    
    const [page, setPage] = useState(savedPage);
    
    function SetPage(pg){setPage(pg)}
    
    //0:Home
    //1:Log View
    //2:Settings
    
    
    function SelectPage(){
        
        SaveRecentPage(page);
        switch(page){
            case 1: 
                return <LogPage SelectPage={SetPage}></LogPage>
            case 2:
                return <UserInfo></UserInfo>
            default:
                return <LogList SelectPage={SetPage}></LogList>
        }
        
    }
    
    const token = localStorage.getItem(lsPrefix+"actk");
    
    
    useEffect(()=>{
        
        SelectPage()
        
    },[page])
    
   
    return(
        <>
        <NavBar SetPage={SetPage} logout={logout} active={page}></NavBar>
        
        <TokenContext.Provider value={token}>
            <PageContext.Provider value={SetPage}>
                {SelectPage()}
                <Goals></Goals>
            </PageContext.Provider>
        </TokenContext.Provider>
        
        {/**Literal filler, large height, large vertical margin, invisible text */}
        <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
        {/**Literal filler, large height, large vertical margin, invisible text */}
        <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
        </>
        
        
        
        )
    }
    
    