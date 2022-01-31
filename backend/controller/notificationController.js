const Lead = require('../model/Lead')
var date = new Date()
var todayDate = date.toISOString().slice(0, 10)

//adding stock into the database
exports.getAllNotification = async(req, res) => {
    try {
        // const followupLead = await Lead.find({nextFollowupdate:`${todayDate}`})
        // const followupLead = await Lead.find({nextFollowupdate:{ $eq: todayDate }})
        const followupLead = await Lead.find().where('nextFollowupdate').all("2022-01-28");
        followupLead.find(function(err, followupLead) {
            if (err) return handleError(err);
            if (followupLead) {
                res.status(201).json({ lead: followupLead })
                console.log("today's Lead has been sent");
            } else {
                res.json({ Message: "Sorry No Lead found for today" })
                console.log("No Leads for today")
            }
        });
        // const followupLead = await Lead.find({nextFollowupdate:{ $in: "2022-01-18" }}) //for check menually
        console.log(followupLead.nextFollowupdate);
        console.log(`${todayDate}`);
        //     if(followupLead){
        //         res.status(201).json({lead:followupLead})
        //         console.log("today's Lead has been sent");

        //     // }else if(followupLead==[]){
        //     }else{
        //         res.json({Message:"Sorry No Lead found for today"})
        //         console.log("No Leads for today")
        //     }  
    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}


// //sending stock to the client
// exports.getStockTech = async (req, res)=>{
//     try {
//         console.log(req.params.id);
//         const data = await stockTech.findById(req.params.id)
//         res.status(200).send(data)
//         console.log("data sent");

//     } catch (error) {
//         res.status(400).json({error:error})
//         console.log(error);

//     }
// }

// //update stock
// exports.putStockTech = async(req, res)=>{
//     try {
//         const update = await stockTech.findByIdAndUpdate(req.params.id, req.body)
//         res.status(200).json({message: "updated successfully"})
//         console.log("stock Updated");

//     } catch (error) {
//         res.status(400).json({error:error})
//         console.log(error);

//     }
// }

// //deleteing stocks
// exports.deleteStockTech = async(req, res)=>{
//     try {
//         const deleteStockTech = await stockTech.findByIdAndDelete(req.params.id)
//         res.status(200).json({message: "Deleted successfully"})
//         console.log("stock Deleted");

//     } catch (error) {
//         res.status(400).json({error:error})
//         console.log(error);

//     }
// }