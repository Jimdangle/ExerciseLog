import {useState} from 'react'
import NavItem from '../NavItem/NavItem'
import { getPage } from '../../../utility/storage'
export default function NavParent({name, children, setter,active}){
    
    const [toggle,setToggle] = useState(false)
    return (
    <div>
        <p className={'nav-item '} onClick={()=>{setToggle((old)=> {return !old})}}>{name}</p>
        {
            toggle ? 
            Object.keys(children).map((child_key,index)=> {
                return (<NavItem key={`nv-pi-${index}`} name={child_key} page={children[child_key]} active={active} setter={setter}></NavItem>)
            })
            :
            <></>
        }
    </div>
    )
}