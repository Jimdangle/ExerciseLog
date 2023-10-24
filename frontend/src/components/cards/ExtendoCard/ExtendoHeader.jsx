import { FiChevronDown } from "react-icons/fi";
/* The header content will take up 2/3 of the box with the toggle button taking the remaining 3rd */
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