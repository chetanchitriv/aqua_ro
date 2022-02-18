const Lead = require('../model/Lead')
const Notification=require('../model/notification')
var date = new Date()
var todayDate = date.toISOString().slice(0, 10)

const notification_create= async(req,res)=>{
    // Lead.find().forEach(function(doc){
    //     if(doc.nextFollowupdate==todayDate){
    //         console.log("Date match");
    //         // Notification.insert(doc); // start to replace
    //     }
    //  });
    // console.log(todayDate);
   
    Lead.find({}, (err, doc) => {
        doc.forEach((meme) => {
            console.log(meme);
          });
    })
    
    // .forEach( function(myDoc) { print( "user: " + myDoc.name ); } );


}
module.exports={
    notification_create
}