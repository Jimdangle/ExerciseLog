/**
 * A function to convert a time value stored in seconds into a string
 * @param {Number} val - Time in seconds to be converted
 * @returns {String} a string in the form hh:mm:ss
 */
export function convertSecondsTime(val){
   
    // have a value in seconds
    // 
    console.log(`Converting seconds from ${val}`)
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
    const out = Number((h*60*60)) + Number((m*60)) + Number(s);
    console.log(`Making time in sec ${out}`)
    return out;
}

export function createTimeObject(timeDifference){ // create the time object we want based on miliseconds difference / will build a time object from a number of miliseconds
    const seconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const remainingSeconds = seconds % (3600 * 24);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    return {days:days,hours:hours,minutes:minutes}
}

