export default function DropInput({name,onChange,items, ...props}){
    const {styles,label} = props;
    return(
        <div>
            <label for={name}>{label}</label>
            <select id={name} name={name} className={styles} onChange={onChange}>
                {items.map((item,index)=>{
                    return <option key={item.name+index} value={item.value}>{item.name}</option>
                })}
            </select>
        </div>
    )
}