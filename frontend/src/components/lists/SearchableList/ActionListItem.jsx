export default function ActionListItem({title,action}){

    return(
        
            <button onClick={action} className="button border-2 w-auto border-gun inline">{title}</button>
        
    )
}