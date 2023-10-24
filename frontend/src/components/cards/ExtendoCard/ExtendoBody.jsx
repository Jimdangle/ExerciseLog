/*  */
import '../../../styles/animations.css'
export default function ExtendoBody({toggleContent,children}){
    return (toggleContent ? 
        <div className="cardDown">
            {children}
        </div>
        :
        <></>
    )
}