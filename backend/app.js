// var date = new Date()
// var completeDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate()
// var strDate = `${completeDate}`
// console.log(strDate);


// console.log(typeof(completeDate)," comp");
// console.log(typeof(strDate)," srtdate");

// const counts = {};
// const sampleArray = ['a', 'a','d','a', 'a','d','a', 'a','d','a', 'a','d','a', 'a','d', 'b', 'c'];
// sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
// console.log(counts)


var obj = { "tisha": 2, "null": 1, "undefined": 3, "Sheetal": 1, "sahil": 7 }

saprate=()=>{
    var name
    var count
    name =(Object.keys(obj))
    count =(Object.values(obj))
    console.log(name,count);
}

saprate()