const Lead = require('../model/Lead')
const Notification=require('../model/notification')
var date = new Date()
var todayDate = date.toISOString().slice(0, 10)

const notification_create   = (req,res)=>{

  
    Lead.find({ nextFollowupdate:todayDate}, (err, doc) => {
        doc.forEach((meme) => {
            const objectExist =  Notification.findOne({
                _id: meme._id,
            });
          if(!objectExist)  {
            Notification.insertMany([meme]) 
          }
         return
        });
      });

  
}
const getAllNotification =async (req,res)=>{
    try{
        const notifications=await Notification.find()
        res.json(notifications)
    }catch(error){
        res.json({
            message:error
        });
        }
    }
module.exports={
    notification_create,
    getAllNotification
}