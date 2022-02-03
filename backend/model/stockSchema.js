const mongoose=require("mongoose")

const stockSchema=new mongoose.Schema({
    spare_name : String,
    Tech_Name: String,
    qnt : String,
    purchaseAmount : Number,
    sellingPrice : Number,
    balanceAmount:Number,
    date: String
   
});

module.exports=mongoose.model("stock",stockSchema)