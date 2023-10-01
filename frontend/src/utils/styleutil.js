export function percentageColor(num){
    console.log(num)
    return (num >= 0.5) ? 'text-green-400' : ( (num >=0.2) ? 'text-yellow-500' : 'text-slate-300' ) 
}

export function percentageColorRed(num){
    return (num >= 0.5) ? 'text-green-400' : ( (num >=0.2) ? 'text-yellow-500' : 'text-red-600' ) 
}

export function stdColorRed(zScore){
    if(zScore <0){
        return 'text-blue-400'
    }
    else if(zScore <1){
        return 'text-green-500'
    }
    else{
        return 'text-red-600'
    }
}