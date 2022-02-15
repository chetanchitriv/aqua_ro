const User = require('../model/User')
const bcrypt = require("bcrypt");


const changePassword=async(req,res)=>{
    console.log(req.body);
    const userId=req.params.id
    const userExist = await User.findOne({
        _id: userId,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(req.body.oldPassword, salt);
    if(userExist.password==hashedPassword){
        console.log("password match")
    }
    // try{
     
    //     console.log(req.params.id);
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword  = await bcrypt.hash(req.body.password, salt);    
    //     const user={
    //         userName:req.body.userName,
    //         email:req.body.email,
    //         password:hashedPassword,
    //         mobile:req.body.mobile,
    //         workingHours:req.body.workingHours,
    //         role:req.body.role
    //     };

   
    //     const updatedUser = await User.findByIdAndUpdate(
    //         {_id:req.params.id},user
    //     )
    //     res.json(updatedUser)
    // }catch(error){
    //     res.status(400).send(error)
    // }
};

module.exports={
    changePassword
}