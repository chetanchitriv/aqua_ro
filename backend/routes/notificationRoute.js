const router=require("express").Router();

const notificationController=require('../controller/notificationController')
const verifyToken =require('../config/verifyToken')

router.get('/', notificationController.getAllNotification,verifyToken.verifyToken);
// router.post('/', notificationController.postNotification,verifyToken.verifyToken);
// router.get('/:id', notificationController.getIdNotification,verifyToken.verifyToken);
// router.put('/:id', notificationController.putStockTech,verifyToken.verifyToken);
// router.delete('/:id', notificationController.deleteStockTech,verifyToken.verifyToken);


module.exports=router