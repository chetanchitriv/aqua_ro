const router=require("express").Router();

const stockTechController=require('../controller/stockTechController')
const verifyToken =require('../config/verifyToken')
stockTechController
router.post('/', stockTechController.postStockTech,verifyToken.verifyToken);
// router.post('/', stockTechController.postStockTech);
router.get('/:id', stockTechController.getStockTech,verifyToken.verifyToken);
// router.get('/:id', stockTechController.getStockTech);
router.put('/:id', stockTechController.putStockTech,verifyToken.verifyToken);
// router.put('/:id', stockTechController.putStockTech);
router.delete('/:id', stockTechController.deleteStockTech,verifyToken.verifyToken);
// router.delete('/:id', stockTechController.deleteStockTech);


module.exports=router