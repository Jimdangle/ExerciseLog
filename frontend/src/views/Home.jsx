import lsPrefix from "../config/cfUtil"
import LogList from "../components/LogList/LogList";
import LogPage from "../components/LogPage/LogPage";
import UserInfo from "../components/UserInfo/UserInfo";
import { createContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Goals from '../components/Goals/Goals'

import { recentPage } from "../config/cfUtil";
import { FaBars ,FaIndent} from "react-icons/fa";
import GoalHome from "../components/Goals/GoalHome";
//Home Show recent workouts and let user edit items in the list
// Two Components I think
// 1) Log List : displays a list of workout logs with edit buttons and delete buttons
// 2) Log Adder : Let the user add a new workout log, name it and press some continue button

export const TokenContext = createContext(null);
export const PageContext = createContext(null);

export default function Home({signout,test}){

    const [isNavDisplayed, setIsNavDisplayed] = useState(false); // state for managing navbar

    const logout = () => {
        localStorage.removeItem(lsPrefix+"actk");
        signout();
        
    }

    const savedPage = localStorage.getItem(recentPage) ?  Number(localStorage.getItem(recentPage)) : 0;

    function SaveRecentPage(page){
        localStorage.setItem(recentPage,String(page))
    }
    
    const [page, setPage] = useState(savedPage);
    
    function SetPage(pg){setPage(pg); setIsNavDisplayed(false)}
    
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
            case 3:
                return <GoalHome></GoalHome>
            default:
                return <LogList SelectPage={SetPage}></LogList>
        }
        
    }
    
    const token = localStorage.getItem(lsPrefix+"actk");
    
    
    useEffect(()=>{
        
        SelectPage()
        
    },[page])
    
   
    return(
        <div className="flex flex-row justify-center">
        
        <div className={"flex flex-col sm:w-[100%] md:w-2/3 duration-300"+ (isNavDisplayed ? " -translate-x-1/3" : "")}>
            <div className="flex pt-2 pr-2 justify-end"><FaBars className="h1-white" onClick={()=>{setIsNavDisplayed(!isNavDisplayed)}}></FaBars></div> 
            <div onClick={()=>{setIsNavDisplayed(false)}}>
                <TokenContext.Provider value={token}>
                    <PageContext.Provider value={SetPage}>
                        {SelectPage()}
                    </PageContext.Provider>
                </TokenContext.Provider>
            </div>
            
            
            {/**Literal filler, large height, large vertical margin, invisible text */}
            <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
            {/**Literal filler, large height, large vertical margin, invisible text */}
            <div className='h-124 mt-64'><p className='text-slate-800'>t</p></div>
        </div>
        <NavBar className="absolute" SetPage={SetPage} logout={logout} active={page} setIsNavDisplayed={setIsNavDisplayed} isNavDisplayed={isNavDisplayed}></NavBar>
        
        </div>
        
        
        
        )
    }
    
    