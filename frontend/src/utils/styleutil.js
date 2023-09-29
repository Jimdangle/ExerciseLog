export function percentageColor(num){
    console.log(num)
    return (num >= 0.5) ? 'text-green-400' : ( (num >=0.2) ? 'text-yellow-500' : 'text-slate-300' ) 
}

export function percentageColorRed(num){
    return (num >= 0.5) ? 'text-green-400' : ( (num >=0.2) ? 'text-yellow-500' : 'text-red-600' ) 
}