const router = require("express").Router();
const invoiceController = require('../controller/invoice_pdfController')
const verifyToken = require('../config/verifyToken')

router.get('/:id', invoiceController.retrive_pdf, verifyToken.verifyToken);
router.get('/', invoiceController.retrive_pdf, verifyToken.verifyToken);
router.put('/:id', invoiceController.update_pdf, verifyToken.verifyToken);
router.delete('/:id', invoiceController.delete_pdf,verifyToken.verifyToken);

router.post('/', invoiceController.createInvoice, verifyToken.verifyToken)

module.exports = router