const router=require("express").Router();

const stockController=require('../controller/graphController')
const verifyToken =require('../config/verifyToken')


router.get('/telecaller', stockController.getGraphTele,verifyToken.verifyToken);
// router.get('/technician', stockController.getGraphTechnician,verifyToken.verifyToken);
// router.get('/admin', stockController.getGraphAdmin,verifyToken.verifyToken);

module.exports=router