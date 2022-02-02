const router=require("express").Router();
const path = require("path")
// const fs = require("fs")
const invoiceController=require('../controller/invoice_pdfController')
const upload=require('../middleware/multer')
const verifyToken =require('../config/verifyToken')

router.post('/',upload.single("invoice_pdf"), invoiceController.invoice_pdf,verifyToken.verifyToken);
router.get('/:id', invoiceController.retrive_pdf,verifyToken.verifyToken);
router.put('/:id', invoiceController.update_pdf,verifyToken.verifyToken);
// router.delete('/:id', invoiceController.delete_pdf,verifyToken.verifyToken);
router.delete('/:id', invoiceController.delete_pdf);

// router.post('/', invoiceController.createInvoice,verifyToken.verifyToken)

module.exports=router