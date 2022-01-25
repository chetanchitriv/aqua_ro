const router=require("express").Router();
const userController=require('../controller/authController')

router.post('/',userController.login);

module.exports=router