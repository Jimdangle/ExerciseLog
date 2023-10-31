/**
 * A function to convert a time value stored in seconds into a string
 * @param {Number} val - Time in seconds to be converted
 * @returns {String} a string in the form hh:mm:ss
 */
export function convertSecondsTime(val){
   
    // have a value in seconds
    // 
    const h = Math.floor(val/3600); // 3600 seconds per hour
    const m = Math.floor((val-h*3600)/60); // what ever we have left, divide by 60 seconds per min
    const s = val - h*3600 - 60*m; // subtract out all of those and we have our remaining seconds

    const hours = `${h}`.padStart(2,'0')
    const min = `${m}`.padStart(2,'0')
    const sec = `${s}`.padStart(2,'0')

    return `${hours}:${min}:${sec}`
}

export function timeToSec(time){
    const h = time.h ? time.h : 0
    const m = time.m ? time.m : 0
    const s = time.s ? time.s : 0
    return Number((h*60*60)) + Number((m*60)) + Number(s)
}