import { setPage, getPage } from "../../utility/storage";
import { FiChevronLeft } from "react-icons/fi";
import {useState, createContext} from 'react'
import NavControl from "../Nav";
import Home from "../Home";
import LSMain from "../SignupLogin";
import Workout from "../Workout";

export const PageContext = createContext(null);
export default function PageSelector({logout}){

    /* Currently active page (if we have one get it, if not use home) */
    
    const pagina = Number(getPage()) > 0 ? Number(getPage()) : 0
    const [active, setActive] = useState(pagina) // state setter for our active page
    const [toggleNav,setToggleNav] = useState(false)
    
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
        <div className="">
        
                {render_page}
            
            
            <div className="absolute top-2 right-2 z-10">
                {toggleNav ? 
                    <NavControl active={active} setActive={changePage} show={toggleNav}></NavControl>
                    :
                    <FiChevronLeft className="h1-white" onClick={()=>setToggleNav(true)}></FiChevronLeft>
                }
            </div>
        </div>
    </PageContext.Provider>)
}