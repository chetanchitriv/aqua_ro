const Lead = require('../model/Lead')
var date = new Date()
var todayDate = date.toISOString().slice(0, 10)

//adding stock into the database
exports.getAllNotification = async(req, res) => {
    try {
        // const followupLead = await Lead.find({nextFollowupdate:`${todayDate}`})
        const followupLead = await Lead.find({ $or: [ {read: false }, {nextFollowupdate:`${todayDate}` }] } )
        // const followupLead = await Lead.find({nextFollowupdate:`2022-01-17`}) //for checking
        // console.log(followupLead.length);
        if(followupLead){
            res.status(201).json({lead:followupLead})
            console.log("today's Lead has been sent");
        }
    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}

exports.readNotification = async (req, res)=>{
    console.log(req.params.id);
    

}
