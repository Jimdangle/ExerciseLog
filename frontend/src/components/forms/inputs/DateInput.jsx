

export default function DateInput({name,value,onChange,...props}){
    const {label} = props;
    return (
        <div className="flex flex-col justify-center">
            <label htmlFor={name}>{label}</label>
            <input type="date" id={name} value={value} onChange={onChange}/>

        </div>
    )
}