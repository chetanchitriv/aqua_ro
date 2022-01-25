const mongoose=require("mongoose")

const leadSchema=new mongoose.Schema({
    name : String,
    mobileNo : Number,
    emailId : String,
    assignTo : String,
    address : String,
    followUpmode : String,
    followUpdate : String,
    followUptime : String,
    comment : String,
    nextFollowupdate : String,
    nextFollowuptime : String,
});

module.exports=mongoose.model("Lead",leadSchema)