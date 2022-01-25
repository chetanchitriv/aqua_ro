const router=require("express").Router();
const leadController=require('../controller/leadController')
const verifyToken =require('../config/verifyToken')

router.post('/',leadController.lead_create,verifyToken.verifyToken);
router.get('/',leadController.lead_all,verifyToken.verifyToken);
router.get('/:id',leadController.lead_details,verifyToken.verifyToken);
router.put("/:id",leadController.lead_update,verifyToken.verifyToken);
router.delete('/:id',leadController.lead_delete,verifyToken.verifyToken);

module.exports=router