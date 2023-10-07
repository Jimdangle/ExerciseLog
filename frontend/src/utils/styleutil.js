export function percentageColor(num){
    console.log(num)
    return (num >= 0.5) ? 'text-ogreen' : ( (num >=0.2) ? 'text-yellow-500' : 'text-oblue' ) 
}

export function percentageColorRed(num){
    return (num >= 0.5) ? 'text-ogreen' : ( (num >=0.2) ? 'text-yellow-500' : 'text-ored' ) 
}

export function stdColorRed(zScore){
    if(zScore <=0){
        return 'text-oblue'
    }
    else if(zScore <=1){
        return 'text-ogreen'
    }
    else{
        return 'text-ored'
    }
}