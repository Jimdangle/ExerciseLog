const muscles = ["Chest", "Back",  "Hamstrings","Quads", "Calves", "Shoulders", "Biceps", "Triceps"]

export function TranslateMuscle(in_group){
    if(in_group<0 || in_group>muscles.length){return muscles[0]}
    return muscles[in_group]
}