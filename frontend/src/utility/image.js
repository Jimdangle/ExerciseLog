
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
    if((score < 2 && score > 1) || (score > -2 && score < -1)) // score is 1-2 stdevs away
        return 'Y';
    else
        return 'R'; // score is more than 2 stdevs away 
}