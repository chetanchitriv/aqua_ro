const mongoose=require("mongoose")

const stockTechSchema=new mongoose.Schema({
    techname: String,
    date : String,
    itemList:[Object]
});

module.exports=mongoose.model("stockTech",stockTechSchema)