import { setPage, getPage } from "../../utility/storage";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import {useState, createContext} from 'react'
import NavControl from "../Nav";
import Home from "../Home";
import Notification from "../../components/notifications/Notification";
import Workout from "../Workout";
import '../../styles/animations.css'
export const PageContext = createContext(null);
export const NotificationContext = createContext(null)
export default function PageSelector({logout}){

    /* Currently active page (if we have one get it, if not use home) */
    const pagina = Number(getPage()) > 0 ? Number(getPage()) : 0
    const [active, setActive] = useState(pagina) // state setter for our active page
    const [toggleNav,setToggleNav] = useState(false)

    const toggle = () => { setToggleNav((v)=>{return !v})}

    
    const [notification,setNotification] = useState(''); // for our notificaiton message
    const displayNotification = (message) => {setNotification(message)}
    const clearNotification = () => {setNotification('')}
    
    /* Set our page state, and save our page  */
    function changePage(page){
        console.log(`New Page ${page}`)
        setPage(page);
        setActive(page);
        setToggleNav(false)
    }

    //these pages should correspond to the numerical values in the NavControl component
    const pages = {
        0: <Home logout={logout}></Home>,
        1: <Workout></Workout>
    }

    const render_page = pages[active];

    return (
    <PageContext.Provider value={changePage}>
        <NotificationContext.Provider value={displayNotification}>
            <div className="overflow-x-hidden">
            
                    {render_page}
                
                
                <FiChevronDown className={"absolute top-3 left-4 " +(toggleNav? " slideDownNav" : " slideUpNav")} onClick={()=>setToggleNav((val)=>{return !val})}></FiChevronDown>   
                <NavControl  active={active} setActive={changePage} show={toggleNav}></NavControl>
                <Notification message={notification} onClose={clearNotification}></Notification>       
            </div>
            
        </NotificationContext.Provider>
    </PageContext.Provider>)
}