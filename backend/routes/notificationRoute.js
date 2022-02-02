const router=require("express").Router();

const notificationController=require('../controller/notificationController')
const verifyToken =require('../config/verifyToken')

router.get('/', notificationController.getAllNotification,verifyToken.verifyToken);

module.exports=router