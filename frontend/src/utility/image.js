
/**
 * Remove all spaces in a string and return the joined / non spaced version
 * @param {String} string the string to remove spaces from
 * @returns {String}  
 */
export function removeSpace(string){
    return string.replace(/ /g, "");
}


export function colorByZScore(score){
    
    if(score >= -1 && score <= 1) // within a single standard deviation
        return 'G';
    else if(score > 1 && score < 2){
        return 'Y';
    }
    else if(score > 2){
        return 'R'
    }
    else if(score < -1){
        return 'B'
    }
}

export function textColorByZScore(score){
    if(score >= -1 && score <= 1) // within a single standard deviation
        return 'text-ogreen';
    else if(score > 1 && score < 2){
        return 'text-oyell';
    }
    else if(score > 2){
        return 'text-ored'
    }
    else if(score < -1){
        return 'text-oblue'
    }
}