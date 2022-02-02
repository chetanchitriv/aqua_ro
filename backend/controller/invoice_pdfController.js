const path = require("path")
const fs = require("fs")
const invoice = require('../model/invoice_pdf')
var easyinvoice = require('easyinvoice');


// storing pdf file into the database
exports.invoice_pdf = async (req, res)=>{

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
        }
        else {
            item.save();
            res.status(200).json({message: "successfully uploaded"})
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
exports.update_pdf = async(req, res)=>{
    const update = await invoice.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({message: "updated successfully"})
    console.log("PDF Updated");
}

//deleteing invoice
exports.delete_pdf = async(req, res)=>{
const update = await invoice.findByIdAndDelete(req.params.id)
res.status(200).json({message: "Deleted successfully"})
console.log("PDF Deleted");
}

exports.createInvoice = (req,res)=>{
    const data =req.data
    const base64 = easyinvoice.createInvoice(data, function (result) {
        //The response will contain a base64 encoded PDF file
        console.log('PDF base64 string: ', result.pdf);
        return result.pdf
    });
    res.send(base64)
}
// easyinvoice.createInvoice(data, function (result) {
//     //The response will contain a base64 encoded PDF file
//     console.log('PDF base64 string: ', result.pdf);
// });

// exports.easyinvoice.createInvoice=async(req,result)=>{
    
//     const data = {
//         "images": {
//             // The logo on top of your invoice
//             "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
//             // The invoice background
//             // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
//         },
//         // Your own data
//         "sender": {
//             "company": "AquaBlue Water Solutions",
//             "address": "Shop No F-47 Jayanti Nagri 5 Manish Nagar",
//             "zip": "440034",
//             "city": "nagpur",
//             "country": "India",
//             "state": "Maharashtra",
//             //"custom2": "custom value 2",
//             //"custom3": "custom value 3"
//         },
//         // Your recipient
//         "client": {
//             "name": req.body.name,
//             "address": req.body.address,
//             "service_type":req.body.serviceType
//             // "zip": ,
//             // "city": "Clientcity",
//             // "country": "Clientcountry"
//             // "custom1": "custom value 1",
//             // "custom2": "custom value 2",
//             // "custom3": "custom value 3"
//         },
//         "information": {
//             "Invoice Number": Math.floor(Math.random() * 10000),
//             "Date": req.body.date,
//             'Due Date': req.body.duedate
//         },
//         // The products you would like to see on your invoice
//         // Total values are being calculated automatically
//         "products": [
//            req.body.itemList
//         ],
//         // The message you would like to display on the bottom of your invoice
//         "bottom-notice": "Kindly pay your invoice within 15 days.",
//         // Settings to customize your invoice
//         "settings": {
//             "currency": "USD", 
            
//         },
//         // Translate your invoice to your preferred language
//         "translate": {
//             // "invoice": "FACTUUR",  // Default to 'INVOICE'
//             // "number": "Nummer", // Defaults to 'Number'
//             // "date": "Datum", // Default to 'Date'
//             // "due-date": "Verloopdatum", // Defaults to 'Due Date'
//             // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
//             // "products": "Producten", // Defaults to 'Products'
//             // "quantity": "Aantal", // Default to 'Quantity'
//             // "price": "Prijs", // Defaults to 'Price'
//             // "product-total": "Totaal", // Defaults to 'Total'
//             // "total": "Totaal" // Defaults to 'Total'
//         },
//     };
    
// //Create your invoice! Easy!
// easyinvoice.createInvoice(data, function (result) {
//     //The response will contain a base64 encoded PDF file
//     console.log('PDF base64 string: ', result.pdf);
// });
// }