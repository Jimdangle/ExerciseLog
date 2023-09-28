export const muscles = ["Chest", "Back",  "Hamstrings", "Quads",  "Biceps", "Triceps","Shoulders"]
const types = ["Lift", "Cardio", "Hold"]
/**
 * 
 * @param {int} in_group muscle group reference by int
 * @returns a muscle group as a string that the int represents
 */
export function TranslateMuscle(in_group){
    if(in_group<0 || in_group>=muscles.length){return muscles[0]}
    return muscles[in_group]
}

/**
 * 
 * @param {int} type the integer type of the motion 
 * @returns the type as a string that the int represents
 */
export function TranslateType(type){
    type = type % types.length;
    return types[type]
}