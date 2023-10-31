export default function TextInput({name,value,onChange,...props}){
    const {styles} = props;
    return(
        <input className={styles} name={name} type="text" value={value} onChange={onChange}></input>
    )
}