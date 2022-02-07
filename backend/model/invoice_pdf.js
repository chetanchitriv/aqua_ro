const mongoose=require("mongoose")

const invoiceSchema=new mongoose.Schema({
    name : String,
    emailId  : String,
    address  : String,
    serviceType : String,
    date:String,
    dueDate:String,
    itemList:[Object]
});

module.exports=mongoose.model("invoice_pdf",invoiceSchema)
