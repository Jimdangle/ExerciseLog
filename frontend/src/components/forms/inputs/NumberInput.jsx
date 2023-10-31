export default function NumberInput({name,value, onChange, ...props}){
    const {styles} = props;
    return(
        <input className={styles} name={name} type="number" value={value} onChange={onChange}></input>
    )
}