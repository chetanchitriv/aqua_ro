const path = require("path")
const fs = require("fs")
const invoice = require('../model/invoice_pdf')
var easyinvoice = require('easyinvoice');


// storing pdf file into the database
exports.invoice_pdf = async(req, res) => {

    console.log(
        req.file.filename
    );
    var obj = {

        invoice_pdf: {
            data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
            contentType: 'Invoice/pdf',
            filename: req.file.filename
        }
    }
    invoice.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.json("Invoice not found")
        } else {
            item.save();
            res.status(200).json({ message: "successfully uploaded" })
        }
    });
}

//retriving pdf file form database
exports.retrive_pdf = async(req, res) => {
    const find = await invoice.findById(req.params.id)
    res.status(200).send(find)
    console.log("invoice sent");
};


//update invoice
exports.update_pdf = async(req, res) => {
    const update = await invoice.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: "updated successfully" })
    console.log("PDF Updated");
}

//deleteing invoice
exports.delete_pdf = async(req, res) => {
    const update = await invoice.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Deleted successfully" })
    console.log("PDF Deleted");
}

exports.createInvoice = (req, res) => {
    try {
        var invoice = new invoice(req.body).save()
        res.status(201).json({message:"invoice has been added"})
        console.log("invoice added");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
    }

    }