const router=require("express").Router();
const teamAllotController=require('../controller/teamAllotController')
const verifyToken =require('../config/verifyToken')

router.post('/',teamAllotController.team_create,verifyToken.verifyToken);
router.get('/',teamAllotController.team_all,verifyToken.verifyToken);
router.get('/:id',teamAllotController.team_details,verifyToken.verifyToken);
router.put("/:id",teamAllotController.team_update,verifyToken.verifyToken);
router.delete('/:id',teamAllotController.team_delete,verifyToken.verifyToken);

module.exports=router