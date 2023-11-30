
export function cssColorByPercent(percent){
    if(!percent || percent===0){return 'text-oblue'}
    else if(percent > 0 & percent <= 0.25){return 'text-ored'}
    else if(percent > 0.25 & percent <= 0.75){return 'text-oyell'}
    else if(percent > 0.75 & percent <= 1){return 'text-ogreen'}
}