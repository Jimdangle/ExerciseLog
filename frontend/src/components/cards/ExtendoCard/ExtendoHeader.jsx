import { FiChevronDown } from "react-icons/fi";

/**
 * Header for ExtendoCard. Let children content take up 2/3s the box, and the toggle button takes remaining third
 * @param {{function, components}} props
 * @param {function} props.toggle - function to toggle the body of ExtendoCard
 * @param {components} props.children - children to render between tags 
 * @returns 
 */
export default function ExtendoHeader({toggle,children}){
    return(
        <div className="flex">
            <div className="w-2/3">
                {children}
            </div>
            <div className="w-1/3 flex justify-end">
                <FiChevronDown onClick={toggle}/>
            </div>
            
        </div>
    )
}