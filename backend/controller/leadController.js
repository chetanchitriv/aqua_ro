const Lead = require('../model/Lead')

//get all users
const lead_all=async(req,res)=>{
    try{
        const leads=await Lead.find()
        res.json(leads)
    }catch(error){
        res.json({
            message:error
        });
    }
};

//single user
const lead_details=async(req,res)=>{
    try {
        const leads = await Lead.findById(req.params.id);
        res.json(leads);
      } catch (error) {
        res.json({ message: error });
      }
};

//add new user
const lead_create= async(req,res)=>{
   
    const lead=new Lead({
        name : req.body.name,
        mobileNo : req.body.mobileNo,
        emailId : req.body.emailId,
        assignTo : req.body.assignTo,
        address : req.body.address,
        followUpmode : req.body.followUpmode,
        followUpdate : req.body.followUpdate,
        followUptime : req.body.followUptime,
        comment : req.body.comment,
        nextFollowupdate : req.body.nextFollowupdate,
        nextFollowuptime : req.body.nextFollowuptime,
    });
    // const body = req.body;
    // const user = new User(body);
  
    try{
        const savedLead = await lead.save()
        res.send(savedLead)
    }catch(error){
        res.status(400).send(error)
    }
};

// update user
const lead_update=async(req,res)=>{
    try{
        const lead={
            name : req.body.name,
            mobileNo : req.body.mobileNo,
            emailId : req.body.emailId,
            assignTo : req.body.assignTo,
            address : req.body.address,
            followUpmode : req.body.followUpmode,
            followUpdate : req.body.followUpdate,
            followUptime : req.body.followUptime,
            comment : req.body.comment,
            nextFollowupdate : req.body.nextFollowupdate,
            nextFollowuptime : req.body.nextFollowuptime,
        };

   
        const updatedLead = await Lead.findByIdAndUpdate(
            {_id:req.params.id},lead
        )
        res.json(updatedLead)
    }catch(error){
        res.status(400).send(error)
    }
};

//delete user
const lead_delete=async(req,res)=>{
    try {
        console.log(req.params.id);
        const removeLead = await Lead.findByIdAndDelete(req.params.id);
        res.json(removeLead);
      } catch (error) {
        res.json({ message: error });
      }
};


module.exports={
    lead_all,
    lead_details,
    lead_create,
    lead_update,
    lead_delete
}