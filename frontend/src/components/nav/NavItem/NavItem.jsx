import {useState, useEffect} from 'react'

/**
 * Granular nav item, displays red if page is active
 * @param {{string,number,function,number}} props
 * @param {string} props.name - Text to display for the nav item
 * @param {number} props.page - Page number of this item
 * @param {function} props.setter - method to set page 
 * @param {number} props.active - number that represents currently selected page
 * @returns 
*/
export default function NavItem({name, page, setter, active}){
    const [isActive, setIsActive] = useState(active===page);
    useEffect(()=> {
        setIsActive(active===page)
    },[active])

    return (
    <div>
        <p className={"nav-item" + (isActive ? " text-ored" : '')} onClick={()=>{ console.log('t'); setter(page)}}>{name}</p>
    </div>
    )
}