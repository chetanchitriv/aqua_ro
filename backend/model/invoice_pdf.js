const mongoose=require("mongoose")

const invoiceSchema=new mongoose.Schema({
    invoice_pdf:
    {
        data: Buffer,
        contentType: String,
        filename:String
    }
});

module.exports=mongoose.model("invoice_pdf",invoiceSchema)
