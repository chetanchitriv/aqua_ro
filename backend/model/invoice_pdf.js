const mongoose=require("mongoose")

const invoiceSchema=new mongoose.Schema({
    name : String,
    emailId  : String,
    address  : String,
    serviceType : Number,
    date:String,
    dueDate:String,
    itemList:[{
        itemName : String,
        description: String,
        qnt:Number,
        rate:Number,
        amt:Number
    }]
});

module.exports=mongoose.model("invoice_pdf",invoiceSchema)
