

export default function DateInput({name,value,onChange,min,...props}){
    const {label,styles} = props;
    return (
        <div className="flex flex-col justify-center">
            <label className="font-semibold my-3 text-center" htmlFor={name}>{label}</label>
            <input type="date" name={name} id={name} value={value} onChange={onChange} className={styles} min={min?min:'11-25-1970'}/>

        </div>
    )
}