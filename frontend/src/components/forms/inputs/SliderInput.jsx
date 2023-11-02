
export default function SliderInput({name,value,onChange,...props}){
    const {min,max,styles,step,label} = props;
    return(
        <div>
            <label className="relative bottom-1 mr-2" htmlFor={name}>{label.replace(' ', '&nbsp;')}</label>
            <input className={"bg-white rounded-md appearance-none active:scale-110 duration-100 "+styles} type="range" min={min} max={max} step={step} name={name} id={name} value={value} onChange={onChange}></input>
            <label className="relative bottom-1 mx-2" htmlFor={name}>{value}</label>
        </div>
    )

}