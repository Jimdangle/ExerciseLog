
export default function SliderInput({name,value,onChange,...props}){
    const {min,max,styles,step,label} = props;
    return(
        <div className={"flex justify-between " + styles}>
            <label className="relative bottom-1 mr-2 w-1/3 overflow-y-hidden text-sm" htmlFor={name}>{label}</label>
            
            <input className={"bg-white overflow-y-hidden rounded-md w-1/3 h-4 appearance-none mr-auto"} type="range" min={min} max={max} step={step} name={name} id={name} value={value} onChange={onChange}></input>
            
           
            <label className="relative bottom-1 w-1/3 mx-2 text-center" htmlFor={name}>{value}</label>
        </div>
    )

}