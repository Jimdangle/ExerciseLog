export default function NumberInput({name,value, onChange, ...props}){
    const {styles,placeholder} = props;
    return(
        <div className="flex flex-col">
            <label htmlFor={name}>{placeholder}</label>
            <input id={name} className={styles} name={name} type="number" value={value} onChange={onChange}></input>
        </div>
    )
}