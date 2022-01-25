const Complaint = require('../model/complaint')

//get all users
const complaint_all=async(req,res)=>{
    try{
        const complaints=await Complaint.find()
        res.json(complaints)
    }catch(error){
        res.json({
            message:error
        });
    }
};

//single user
const complaint_details=async(req,res)=>{
    try {
        const complaint = await Complaint.findById(req.params.id);
        res.json(complaint);
      } catch (error) {
        res.json({ message: error });
      }
};

//add new user
const complaint_create= async(req,res)=>{
   
    const complaint=new Complaint({
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
        complaintInfo: req.body.complaintInfo,
        complaintDate:req.body.complaintDate
    });
    // const body = req.body;
    // const user = new User(body);
  
    try{
        const savedComplaint = await complaint.save()
        res.send(savedComplaint)
    }catch(error){
        res.status(400).send(error)
    }
};

// update user
const complaint_update=async(req,res)=>{
    try{
        const complaint={
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
            complaintInfo: req.body.complaintInfo,
            complaintDate:req.body.complaintDate
        };

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            {_id:req.params.id},complaint
        )
        res.json(updatedComplaint)
    }catch(error){
        res.status(400).send(error)
    }
};

//delete user
const complaint_delete=async(req,res)=>{
    try {
        console.log(req.params.id);
        const removeComplaint = await Complaint.findByIdAndDelete(req.params.id);
        res.json(removeComplaint);
      } catch (error) {
        res.json({ message: error });
      }
};


module.exports={
    complaint_all,
    complaint_details,
    complaint_create,
    complaint_update,
    complaint_delete
}