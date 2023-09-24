
//Volume is calculated as Set x Reps x Weight
// Sum the product of each set to create the volume for the entire exercise
function ExerciseVolume(exercise){
    if(!exercise || !exercise.sets){return 0; }
    var vol = exercise.sets.reduce( (total,set)=> { 
        var weight = set.added_weight >0 ? set.added_weight : 1 // account for non weighted exercise
        return total + (set.rep_or_time* weight)},0);
    console.log(`Calculated Volume: ${vol}`)
    return vol;
}

module.exports = {
    ExerciseVolume:ExerciseVolume
}