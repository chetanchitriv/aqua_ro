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

exports.createInvoic = async(req, res) => {
    // console.log(req.body.itemList)
    // var array = req.body.itemList
    var data = {
        "data": {

            "images": {

                "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png"
            },
            "sender": {
                "company": "AquaBlue Water Solutions",
                "address": "Shop No F-47 Jayanti Nagri 5 Manish Nagar",
                "zip": "440034",
                "city": "nagpur",
                "country": "India",
                "state": "Maharashtra"
            },
            "client": {
                "name": req.body.name,
                "address": req.body.address,
                "service_type": req.body.serviceType
            },
            "information": {
                "Invoice Number": Math.floor(Math.random() * 10000),
                "Date": req.body.date,
                'Due Date': req.body.dueDate,
            },
            "products":  { itemName: '1', description: '2', qnt: '10', rate: '10', amt: '10' },
            "settings": {
                "currency": "USD"
            }
        }
    }
    // array.forEach(e =>{
    //     data.data.products.push(e)
    //     console.log(data.data.products);
    // })

    console.log(data);
    console.log(req.body.itemList);
    await easyinvoice.createInvoice(data, function(result) {
        //The response will contain a base64 encoded PDF file
        res.json({ pdf: result.pdf })
    });
}