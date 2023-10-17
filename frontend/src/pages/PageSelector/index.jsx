import { setPage, getPage } from "../../utility/storage";
import {useState, createContext} from 'react'
import NavControl from "../Nav";
import Home from "../Home";
import LSMain from "../SignupLogin";

const PageContext = createContext(null);
export default function PageSelector({logout}){

    /* Currently active page (if we have one get it, if not use home) */
    const pagina = Number(getPage()) > 0 ? Number(getPage()) : 0
    const [active, setActive] = useState(pagina) // state setter for our active page

    /* Set our page state, and save our page  */
    function changePage(page){
        setPage(page);
        setActive(page);
    }

    //these pages should correspond to the numerical values in the NavControl component
    const pages = {
        0: <Home logout={logout}></Home>,
        
    }

    const render_page = pages[active];

    return (
    <PageContext.Provider value={changePage}>
        {render_page}
        <NavControl active={active} setActive={setActive}></NavControl>
    </PageContext.Provider>)
}