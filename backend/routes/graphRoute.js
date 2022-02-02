const router=require("express").Router();

const stockController=require('../controller/graphController')
const verifyToken =require('../config/verifyToken')

// router.post('/', stockController.postStock,verifyToken.verifyToken);
// router.get('/:id', stockController.getStock,verifyToken.verifyToken);
router.get('/', stockController.getGraphTele,verifyToken.verifyToken);
// router.put('/:id', stockController.putStock,verifyToken.verifyToken);
// router.delete('/:id', stockController.deleteStock,verifyToken.verifyToken);


module.exports=router