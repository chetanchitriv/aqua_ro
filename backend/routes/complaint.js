const router=require("express").Router();
const complaintController=require('../controller/complaintController')
const verifyToken =require('../config/verifyToken')

router.post('/',complaintController.complaint_create,verifyToken.verifyToken);
router.get('/',complaintController.complaint_all,verifyToken.verifyToken);
router.get('/:id',complaintController.complaint_details,verifyToken.verifyToken);
router.put("/:id",complaintController.complaint_update,verifyToken.verifyToken);
router.delete('/:id',complaintController.complaint_delete,verifyToken.verifyToken);

module.exports=router