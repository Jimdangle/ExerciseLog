// Want to render the appropriate screen in Home.jsx based on the most recently selected nav bar item
// Home page : lists all recent workout logs, lets you create a new one (LogList) (clicking a log takes you to log page)
// Most Recent: Displays the most recently edited log in full view (Log page)
// User Info Page: Display the users information [planned]
import { useState } from "react"

export default function NavBar({SetPage, logout,active}){
    
   

    

    return(
    <div className="w-full h-12 py-2 md:mobile_top lg:desktop_top text-center font-semibold text-xl shadow-md border-b-2">
        <a className={"duration-150 "+(active==0 ? "nav-a-item" : "nav-item")} onClick={()=>{SetPage(0); }}>Home</a>
        <a className={"duration-150 "+(active==1 ? "nav-a-item" : "nav-item")} onClick={()=>{ SetPage(1);}}>Log</a>
        <a className={"duration-150 "+(active==2 ? "nav-a-item" : "nav-item")} onClick={()=>{ SetPage(2);}}>Summary</a>
        <a className={"duration-150 "+(active==4 ? "nav-a-item" : "nav-item")} onClick={()=>logout()}>Logout</a>
    </div>)
}