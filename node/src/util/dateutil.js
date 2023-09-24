
function GetDateFromOption(rangeOption){
    var date = new Date();
    rangeOption = Number(rangeOption)
    switch(rangeOption){
        case 0:
            return new Date(date.setDate(date.getDate() - 7))
        case 1:
            return new Date(date.setDate(date.getDate() - 31));
        case 2:
            return new Date(date.setDate(date.getDate() - 31*4));
        case 3:
            return new Date(date.setDate(date.getDate() - 365));
        default:
            return new Date(date.setFullYear(date.getFullYear()-100)) // should cover the 100 year olds using the app
    }
}

module.exports = {
    GetDate:GetDateFromOption
}