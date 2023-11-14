import {useState} from 'react'
import NavItem from '../NavItem/NavItem'
import { getPage } from '../../../utility/storage'

/**
 * Nav Parent renders its children out as nav items (used for a nav item that has sub pages)
 * @param {{string, array, function, number}} props
 * @param {string} props.name - display text for component 
 * @param {array} props.children - array of children nav items to render 
 * @param {function} props.setter - setter function for pages 
 * @param {number} props.active - currently active page
 * @component 
 */
export default function NavParent({name, children, setter,active}){
    
    const [toggle,setToggle] = useState(false)
    return (
    <div>
        <p className={'nav-item '} onClick={()=>{setToggle((old)=> {return !old})}}>{name}</p>
        {
            toggle ? 
            Object.keys(children).map((child_key,index)=> {
                return (
                <div className='flex'>
                    <div className='w-[10%]'></div>
                    <div>
                        <NavItem key={`nv-pi-${index}`} name={child_key} page={children[child_key]} active={active} setter={setter}></NavItem>
                    </div>
                </div>
                )
            })
            :
            <></>
        }
    </div>
    )
}