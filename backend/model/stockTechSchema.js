const mongoose=require("mongoose")

const stockTechSchema=new mongoose.Schema({
    spare_name : String,
    techname: String,
    qnt : Number,
});

module.exports=mongoose.model("stockTech",stockTechSchema)