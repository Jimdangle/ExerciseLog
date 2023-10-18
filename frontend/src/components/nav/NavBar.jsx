import { getPage } from "../../utility/storage";
import NavItem from "./NavItem/NavItem";
import NavParent from "./NavParent/NavParent";
import '../animations.css'
export default function NavBar({nav, active}){
    

    return(
        <div className="h-full bg-slate-600 slider">
            
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