const path = require("path")
const fs = require("fs")
const invoice = require('../model/invoice_pdf')
var easyinvoice = require('easyinvoice');

exports.retrive_pdf = async (req, res) => {
    const find = await invoice.find()
    res.status(200).send(find)
    console.log("invoice sent");
};


//update invoice
exports.update_pdf = async (req, res) => {
    const update = await invoice.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: "updated successfully" })
    console.log("PDF Updated");
}

//deleteing invoice
exports.delete_pdf = async (req, res) => {
    const update = await invoice.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Deleted successfully" })
    console.log("PDF Deleted");
}

exports.createInvoice = (req, res) => {
    try {
        var body = req.body
        var obj = {
            "name": body.name,
            "emailId": body.emailId,
            "address": body.address,
            "serviceType": body.serviceType,
            "date": body.date,
            "dueDate": body.dueDate,
            "itemList": req.body.itemList
        }

        invoice.create(obj, (err, item) => {
            if (err) {
                console.log(err);
                console.log(req.body.itemList[0].itemName);
                res.json("Invoice not found")
            } else {
                item.save();
                console.log(req.body);
                res.status(200).json({ data: item })
                console.log("invoice added");
            }
        });

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}