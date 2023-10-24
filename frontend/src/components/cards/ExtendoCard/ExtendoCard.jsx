/* ExtendoCard is a card that has a header above a footer, there will be a toggle button that can expand the body section and show detailed content */
import { useState } from "react";
import ExtendoHeader from "./ExtendoHeader";
import ExtendoBody from "./ExtendoBody"
import ExtendoFooter from "./ExtendoFooter";
export default function ExtendoCard({header,body,footer,styles}){
    const [toggleContent,setToggleContent] = useState(false);
    const toggle = ()=>{setToggleContent((v)=>{return !v})}
    return(
        <div className={"flex flex-col " + styles}>
            <ExtendoHeader toggle={toggle}>{header}</ExtendoHeader>
            <ExtendoBody toggleContent={toggleContent}>{body}</ExtendoBody>
            <ExtendoFooter>{footer}</ExtendoFooter>
        </div>
    )


}