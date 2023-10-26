
import '../../../styles/animations.css'

/**
 * The body component for the ExtendoCard component
 * @param {{boolean, components}} props
 * @param {boolean} props.toggleContent - boolean representing if this component should be displayed or not
 * @param {children} props.children - react children being passed between tags <ExtendoBody>{children}</ExtendoBody> 
 * @component
 */
export default function ExtendoBody({toggleContent,children}){
    return (toggleContent ? 
        <div className="cardDown">
            {children}
        </div>
        :
        <></>
    )
}