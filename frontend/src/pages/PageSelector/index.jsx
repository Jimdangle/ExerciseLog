import { setPage, getPage,getLog, setLog } from "../../utility/storage";
import { FiChevronLeft, FiChevronDown } from "react-icons/fi";
import {useState, createContext,useEffect} from 'react'
import { useRequest } from "../../hooks/requests/useRequest";
import NavControl from "../Nav";
import Home from "../Home";
import Notification from "../../components/notifications/Notification";
import Workout from "../Workout";
import WorkoutHistory from "../History/WorkoutHistory";
import GoalMaker from "../Goals/GoalMaking/GoalMaker";
import GoalViewer from "../Goals/GoalViewing/GoalViewer";
import '../../styles/animations.css'
export const PageContext = createContext(null);
export const NotificationContext = createContext(null)

/**
 * PageSelector, used to Render the currently selected page, as well as provide notifcation, and page setting functions to the rest of the application
 * @param {{function}} props  
 * @param {function} props.logout - Logout method
 * @description **note** the variable `pages` controls what the NavControl will point to
 */
export default function PageSelector({logout}){
    //On first load we want to get our users last workout so they can jump back into it
    const {data,fetchData:getWorkouts} = useRequest('/workout/lsm');
    useEffect(()=>{
        getWorkouts();
    },[])
    useEffect(()=>{
        
        if(data && data.all && data.all.length > 0 && !getLog()){
            const all = data.all;
            setLog(all[all.length-1]._id)
        }
    },[data])


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
        1: <Workout></Workout>,
        2: <GoalMaker/>,
        3: <GoalViewer/>,
        4: <WorkoutHistory/>
    }

    const render_page = pages[active];

    return (
    <PageContext.Provider value={changePage}>
        <NotificationContext.Provider value={displayNotification}>
            <div className="overflow-x-hidden overflow-y-visible">
            
                    {render_page}
                
                
                <FiChevronDown className={"absolute top-3 left-4 z-20 " +(toggleNav? " slideDownNav" : " slideUpNav")} onClick={()=>setToggleNav((val)=>{return !val})}></FiChevronDown>   
                <NavControl  active={active} setActive={changePage} show={toggleNav}></NavControl>
                <Notification message={notification} onClose={clearNotification}></Notification>       
            </div>
            
        </NotificationContext.Provider>
    </PageContext.Provider>)
}