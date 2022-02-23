const router=require("express").Router();
const notificationController=require('../controller/notification')
const verifyToken =require('../config/verifyToken')

router.post('/',notificationController.notification_create,verifyToken.verifyToken);
router.get('/',notificationController.getAllNotification,verifyToken.verifyToken)

module.exports=router