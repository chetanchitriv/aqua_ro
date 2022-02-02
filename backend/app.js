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


// var obj = { "tisha": 2, "null": 1, "undefined": 3, "Sheetal": 1, "sahil": 7 }

// saprate=()=>{
//     var name
//     var count
//     name =(Object.keys(obj))
//     count =(Object.values(obj))
//     console.log(name,count);
// }

// saprate()


var data = {
    "data": {

        "images": {

            "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png"
        },
        "sender": {
            "company": "AquaBlue Water Solutions",
            "address": "Shop No F-47 Jayanti Nagri 5 Manish Nagar",
            "zip": "440034",
            "city": "nagpur",
            "country": "India",
            "state": "Maharashtra"
        },
        "client": {
            "name": "req.body.name",
            "address": "req.body.address",
            "service_type": "req.body.serviceType"
        },
        "information": {
            "Invoice Number": 'Math.floor(Math.random() * 10000)',
            "Date": "req.body.date",
            'Due Date': "req.body.dueDate",
        },
        "products": [],
        "settings": {
            "currency": "USD"
        }
    }
}

console.log(data.data.products);