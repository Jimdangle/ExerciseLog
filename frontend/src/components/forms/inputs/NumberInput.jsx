export default function NumberInput({name,value, onChange, ...props}){
    const {styles,label} = props;
    return(
        <div className="flex flex-col">
            <input id={name} className={styles} name={name} type="number" value={value} onChange={onChange}></input>
            <label className="" htmlFor={name}>{label}</label>
        </div>
    )
}