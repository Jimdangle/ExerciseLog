// Want to render the appropriate screen in Home.jsx based on the most recently selected nav bar item
// Home page : lists all recent workout logs, lets you create a new one (LogList) (clicking a log takes you to log page)
// Most Recent: Displays the most recently edited log in full view (Log page)
// User Info Page: Display the users information [planned]


export default function NavBar({SetPage, logout}){
    
    
    return(
    <div className="w-full h-12 my-2 py-2 md:mobile_top lg:desktop_top text-center font-semibold text-xl bg-blue-200 shadow-md">
        <a className="inline px-5" onClick={()=>SetPage(0)}>Home</a>
        <a className="inline px-5" onClick={()=>SetPage(1)}>Log</a>
        <a className="inline px-5" onClick={()=>SetPage(2)}>Settings</a>
        <a className="inline px-5" onClick={()=>logout()}>Logout</a>
    </div>)
}