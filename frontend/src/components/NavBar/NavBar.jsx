// Want to render the appropriate screen in Home.jsx based on the most recently selected nav bar item
// Home page : lists all recent workout logs, lets you create a new one (LogList) (clicking a log takes you to log page)
// Most Recent: Displays the most recently edited log in full view (Log page)
// User Info Page: Display the users information [planned]
import { FaBars ,FaIndent} from "react-icons/fa";
import { useState } from "react"

export default function NavBar({SetPage, logout,active, setIsNavDisplayed, isNavDisplayed}){
   
   

    

    return(
        

        <div className={" rounded-l-md bg-slate-600 py-2  text-center font-semibold text-xl shadow-md border-b-2 flex flex-col duration-300 transition-all absolute " + (isNavDisplayed ? "left-1/3 w-2/3 lg:left-2/3 lg:w-1/3 h-full" : "left-full w-0 h-0")}>
            <a className={"duration-200 py-2 "+(active==0 ? "nav-a-item" : "nav-item") + (isNavDisplayed ? " block" : " hidden")} onClick={()=>{SetPage(0); }}>Home</a>
            <a className={"duration-200 py-2 "+(active==1 ? "nav-a-item" : "nav-item") + (isNavDisplayed ? " block" : " hidden")} onClick={()=>{ SetPage(1);}}>Log</a>
            <a className={"duration-200 py-2 "+(active==2 ? "nav-a-item" : "nav-item") + (isNavDisplayed ? " block" : " hidden")} onClick={()=>{ SetPage(2);}}>Summary</a>
            <a className={"duration-200 py-2 "+(active==3 ? "nav-a-item" : "nav-item") + (isNavDisplayed ? " block" : " hidden")} onClick={()=>{ SetPage(3);}}>Goals</a>
            <a className={"duration-200 py-2 "+(active==4 ? "nav-a-item" : "nav-item") + (isNavDisplayed ? " block" : " hidden")} onClick={()=>logout()}>Logout</a>
            <FaIndent className="h1-white" onClick={()=>{setIsNavDisplayed(false)}}></FaIndent>
        </div>
            
        )
}