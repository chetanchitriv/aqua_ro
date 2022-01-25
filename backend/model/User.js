const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    mobile:Number,
    password:String,
    workingHours:Number,
    role:String
});

module.exports=mongoose.model("User",userSchema)