export  function GetLocal(time_string){
    
    const date = new Date(time_string);
    console.log(`New date should be: ${date}`);
    return date.toString();
}

export function isTimeString(string){
    console.log(`is ${string} a timestring? ${(new Date(string).getTime()) ? true : false}`)
    return (new Date(string).getTime()) ? true : false
}
