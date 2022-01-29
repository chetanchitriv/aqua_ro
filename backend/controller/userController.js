const User = require('../model/User')
const bcrypt = require("bcrypt");

//get all users
const user_all=async(req,res)=>{
    try{
        const users=await User.find({ role: { $ne: 'Superadmin' } })
        res.json(users)
    }catch(error){
        res.json({
            message:error
        });
    }
};

//single user
const user_details=async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

//add new user
const user_create= async(req,res)=>{
    // checking user email id in database
    const emailExit = await User.findOne({
        email: req.body.email
    });

    if (emailExit) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword  = await bcrypt.hash(req.body.password, salt);
    
    const user=new User({
        userName:req.body.userName,
        email:req.body.email,
        password:hashedPassword,
        mobile:req.body.mobile,
        workingHours:req.body.workingHours,
        role:req.body.role
    });
    // const body = req.body;
    // const user = new User(body);
  
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(error){
        res.status(400).send(error)
    }
};

// update user
const user_update=async(req,res)=>{
    try{
        console.log(req.params.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(req.body.password, salt);    
        const user={
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPassword,
            mobile:req.body.mobile,
            workingHours:req.body.workingHours,
            role:req.body.role
        };

   
        const updatedUser = await User.findByIdAndUpdate(
            {_id:req.params.id},user
        )
        res.json(updatedUser)
    }catch(error){
        res.status(400).send(error)
    }
};

//delete user
const user_delete=async(req,res)=>{
    try {
        console.log(req.params.id);
        const removeUser = await User.findByIdAndDelete(req.params.id);
        res.json(removeUser);
      } catch (error) {
        res.json({ message: error });
      }
};


module.exports={
    user_all,
    user_details,
    user_create,
    user_update,
    user_delete
}