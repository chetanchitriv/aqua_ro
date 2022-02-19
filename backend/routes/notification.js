const router=require("express").Router();
const notificationController=require('../controller/notification')
const verifyToken =require('../config/verifyToken')

router.get('/',notificationController.notification_create,verifyToken.verifyToken);

module.exports=router