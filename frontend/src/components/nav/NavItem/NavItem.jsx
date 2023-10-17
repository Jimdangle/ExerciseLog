import {useState, useEffect} from 'react'
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