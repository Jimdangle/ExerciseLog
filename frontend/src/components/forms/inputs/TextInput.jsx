export default function TextInput({name,value,onChange,...props}){
    const {styles,label} = props;
    return(
        <div className="flex flex-col">
            <label className="text-center my-3 font-semibold" htmlFor={name}>{label}</label>
            <input className={styles} name={name} type="text" value={value} onChange={onChange}></input>
        </div>
        
    )
}