const router=require("express").Router();

const stockController=require('../controller/stockController')
const verifyToken =require('../config/verifyToken')

router.post('/', stockController.postStock,verifyToken.verifyToken);
// router.post('/', stockController.postStock);
router.get('/:id', stockController.getStock,verifyToken.verifyToken);
// router.get('/:id', stockController.getStock);
router.put('/:id', stockController.putStock,verifyToken.verifyToken);
// router.put('/:id', stockController.putStock);
router.delete('/:id', stockController.deleteStock,verifyToken.verifyToken);
// router.delete('/:id', stockController.deleteStock);


module.exports=router