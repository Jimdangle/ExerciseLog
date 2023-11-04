export default function NumberInput({name,value, onChange, ...props}){
    const {styles,label} = props;
    return(
        <div className="flex flex-row">
            <label className="mr-2" htmlFor={name}>{label}</label>
            <input id={name} className={styles} name={name} type="number" value={value} onChange={onChange}></input>
            
        </div>
    )
}