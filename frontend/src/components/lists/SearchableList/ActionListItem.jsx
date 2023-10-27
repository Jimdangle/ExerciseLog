/**
 * Represents the items inside the SearchableList, could be used on other things its just a button with a onclick action
 * @param {{string,function}} props
 * @param {string} props.title - Text for the button
 * @param {function} props.action - function to do when clicked 
 * @component
 */
export default function ActionListItem({title,action}){

    return(
        
            <button onClick={action} className="button border-2 w-auto border-gun inline">{title}</button>
        
    )
}