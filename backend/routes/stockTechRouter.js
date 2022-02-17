const router=require("express").Router();

const stockTechController=require('../controller/stockTechController')
const verifyToken =require('../config/verifyToken')
stockTechController
router.post('/', stockTechController.postStockTech,verifyToken.verifyToken);
router.get('/', stockTechController.getallStockTech,verifyToken.verifyToken);
router.get('/:id', stockTechController.getStockTech,verifyToken.verifyToken);
router.put('/:id', stockTechController.putStockTech,verifyToken.verifyToken);
router.delete('/:id', stockTechController.deleteStockTech,verifyToken.verifyToken);
router.post('/stock/:id', stockTechController.stockOperations,verifyToken.verifyToken);


module.exports=router