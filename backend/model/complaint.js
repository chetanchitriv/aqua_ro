const mongoose=require("mongoose")

const complaintSchema=new mongoose.Schema({
    name : String,
    mobileNo : Number,
    AltmobileNo:Number,
    emailId : String,
    assignTo : String,
    address : String,
    followUpmode : String,
    followUpdate : String,
    followUptime : String,
    comment : String,
    nextFollowupdate : String,
    nextFollowuptime : String,
    complaintInfo: String,
    complaintDate:String,
    createdBy:String
});

module.exports=mongoose.model("Complaint",complaintSchema)