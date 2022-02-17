const User = require('../model/User')
const bcrypt = require("bcrypt");


const changePassword=async(req,res)=>{
    try{
        var newPassword=req.body.newPassword
        var cnfirmPassword=req.body.confirmPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(req.body.newPassword, salt);  
        if(newPassword==cnfirmPassword){
            const updatedUser = await User.findByIdAndUpdate(
                {_id:req.params.id},{password:hashedPassword}
            )
            res.json({message:"Password Updated Successfully"})
        }
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports={
    changePassword
}