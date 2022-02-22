const Lead = require('../model/Lead')
const Notification=require('../model/notification')
var date = new Date()
var todayDate = date.toISOString().slice(0, 10)

const notification_create= async(req,res)=>{
try{
    await Lead.find({ nextFollowupdate:todayDate}, (err, doc) => {
        doc.forEach((meme) => {
          console.log(meme);
          Notification.insertMany([meme])
        });
      });

    const notifications=await Notification.find()
    res.json(notifications)

}catch(error){
    res.json({
        message:error
    });
    }
}

module.exports={
    notification_create
}