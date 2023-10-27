import { getPage } from "../../utility/storage";
import NavItem from "./NavItem/NavItem";
import NavParent from "./NavParent/NavParent";
import useAnimation from "../../hooks/animation/useAnimation";


/**
 * NavBar component for visually displaying nav items
 * @param {{Object,number}} props
 * @param {Object} props.nav - An object describing the navigational items to render, containing a setter function 
 * @param {number} props.active - the currently active page according to our parent
 * @component
 */
export default function NavBar({nav, active}){
    

    return(
        <div className={""}>
            
            {
            Object.keys(nav.links).map( (root_key, index) => {
                
                if( typeof nav.links[root_key] ===  'number'){
                    
                    //render a NavItem
                    return <NavItem key={`nv-i-${index}`} name={root_key} page={nav.links[root_key]} setter={nav.setter} active={active}></NavItem>
                }
                else if(typeof nav.links[root_key] === 'object'){
                    // render the children by passing it to a NavParent
                    
                    return <NavParent key={`nv-i-${index}`} name={root_key} children={nav.links[root_key].children} setter={nav.setter} active={active}></NavParent>
                }
            })
            }
        </div>
    )
}