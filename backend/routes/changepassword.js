const router=require("express").Router();
const changePassController=require('../controller/changepasscontroller')
const verifyToken =require('../config/verifyToken')

router.put("/:id",changePassController.changePassword, verifyToken.verifyToken)

module.exports=router