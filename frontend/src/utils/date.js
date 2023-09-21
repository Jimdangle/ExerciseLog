export  function GetLocal(time_string){
    
    const date = new Date(time_string);
    
    return date.toString();
}

export function isTimeString(string){
    
    return (new Date(string).getTime()) ? true : false
}
