const router=require("express").Router();
const userController=require('../controller/userController')
const verifyToken =require('../config/verifyToken')

router.post('/',userController.user_create,verifyToken.verifyToken);
router.get('/',userController.user_all,verifyToken.verifyToken);
router.get('/:id',userController.user_details, verifyToken.verifyToken);
router.put("/:id",userController.user_update, verifyToken.verifyToken);
router.delete('/:id',userController.user_delete, verifyToken.verifyToken);

module.exports=router