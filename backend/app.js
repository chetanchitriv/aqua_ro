var date = new Date()
var completeDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate()
var strDate = `${completeDate}`
console.log(strDate);


console.log(typeof(completeDate)," comp");
console.log(typeof(strDate)," srtdate");