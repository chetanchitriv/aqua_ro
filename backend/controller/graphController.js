
const User = require('../model/User')

exports.getGraphTele = async (req, res) => {
    try {
        // const lead = await Lead.find({},{createdBy:1,_id:0})
        
        const lead = await User.aggregate([{
            $lookup: {
                from: 'leads',
                localField: 'userName',
                foreignField: 'createdBy',
                as: 'data.matchUsers'
            }
        }
        ]);
        console.log(lead.map(data => data));
        // console.log(lead.filter(data => data.data.matchUsers.length!=[]));  //total his lead
        // console.log(lead.map(data => data.data.matchUsers.length!=[]));
        // var matchedLead = lead.filter(data => data.data.matchUsers.length!=[])
        // console.log(matchedLead);
        var matchedLead = lead.filter(data => data.data.matchUsers.length!=[])
        // .map(data=>data.role)
        // console.log(matchedLead.filter(data=>data.role=='Telecaller'?data.name:1));
        // console.log(matchedLead.map(data=>data).map(data => data.data.matchUsers.length));
        // console.log(matchedLead.map(data=>data.userName));
        // console.log(matchedLead.map(data=>data.role));
        var totalLeadOfUser = matchedLead.map(data=>data).map(data => data.data.matchUsers.length)
        var matchedUsername = matchedLead.map(data=>data.userName)
        var role = matchedLead.map(data=>data.role)
        console.log(totalLeadOfUser,matchedUsername,role);
        var techname = []
        var techcount = []
        var telename = []
        var telecount = []
        for(x in totalLeadOfUser,matchedUsername,role){
            if(role[x]=="Technician"){
                techname.push(matchedUsername[x])
                techcount.push(totalLeadOfUser[x])
            }else if (role[x]=="Telecaller"){
                telename.push(matchedUsername[x])
                telecount.push(totalLeadOfUser[x])
            }
        }
        console.log("telecaller",telename,telecount);
        console.log("technicion",techname,techcount);
        // var x = lead.map(data => data.data)
        // console.log(lead.map(data => data.data).map(data=>Object.values(data).filter(data=>data!=null)));
        // console.log(lead.map(data=>data.data.matchUsers).map(data=>data.map(data=>data.role)));
        // console.log(lead.map(data=>data.createdBy));
        // console.log(lead.map(data => data));
        // console.log(lead.map(data => data.role));
        // console.log(lead.map(data => data));
        // console.log(lead.map(data=>data.data).map(data=>data.createdBy).filter(data=>data.length!=0))
        // // var telecaller = lead.filter(data=>data.role=="Telecaller").map(data=>data.userName)
        // var telecaller = lead.map(data => data.userName)
        // // console.log(lead.map(data => data.createdBy)); 
        // var Technician = lead.map(data => data.role)
        // console.log(telecaller);
        // console.log(Technician);
        // var teleobj = {}
        // var techobj = {}
        // telecaller.forEach(function (x) { teleobj[x] = (teleobj[x] || 0) + 1; });
        // Technician.forEach(function (x) { techobj[x] = (techobj[x] || 0) + 1; });
        // console.log(teleobj);
        // console.log(techobj);
        // var teleName =  (Object.keys(teleobj))
        // var teleCount = (Object.values(teleobj))
        // var TechName =  (Object.keys(techobj))
        // var TechCount = (Object.values(techobj))
        // console.log(teleName,teleCount,TechName,TechCount );





        // console.log(lead[0].data.map(data=>data.createdBy));
    //    x = lead.filter(data=>data.role=="Telecaller").map(data=>data.userName)
        // console.log(lead.map(data => data.userName));
        // console.log(lead.map(data => data.role));
        // console.log(x);
        // console.log(lead[0].data);
        // var creatBy = lead.map(data=>data.createdBy)
        // console.log(creatBy);
        // console.log(lead);
        // console.log(lead[0].);
        // var TelecallerName = []
        // var technicianName = []

        // for (x in lead) {
        //     const UserRolecheck = await User.findOne({ userName: lead[x].createdBy })
        //     if (UserRolecheck) {

        //         console.log(`${UserRolecheck.userName} Role is ${UserRolecheck.role}`);
        //         if  (UserRolecheck.role == "Telecaller") {
        //             TelecallerName.push(lead[x].createdBy)
        //         }else if(UserRolecheck.role == "Technician"){
        //             technicianName.push(lead[x].createdBy)
        //         }
        //     }
        // }
        // var teleobj = {}
        // console.log(teleobj);
        // var techobj = {}
        // console.log(techobj);

        //   TelecallerName.forEach(function (x) { teleobj[x] = (teleobj[x] || 0) + 1; });
        //   technicianName.forEach(function (x) { techobj[x] = (techobj[x] || 0) + 1; });
        // let teleName, teleCount, TechName, TechCount

        // teleName =  (Object.keys(teleobj))
        // teleCount = (Object.values(teleobj))
        // TechName =  (Object.keys(techobj))
        // TechCount = (Object.values(techobj))
        // // console.log(obj);
        // res.status(201).json({ label: teleName, teleCount,TechName,TechCount })
        res.status(201).json({ label: {telecaller:telename,telecount,
        technicion:techname,techcount} })
        // console.log({ label:  teleName, teleCount,TechName,TechCount });
        console.log("res send");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}

// exports.getGraphTechnician = async (req, res) => {
//     try {
//         const lead = await Lead.find()
//         var technicianName = []
//         for (x in lead) {
//             const UserRolecheck = await User.findOne({ userName: lead[x].createdBy })

//             if (UserRolecheck) {
//                 console.log(`${UserRolecheck.userName} Role is ${UserRolecheck.role}`);
//                 if (UserRolecheck.role == "Technician") {
//                     technicianName.push(lead[x].createdBy)
//                 }
//             }
//         }
//         var obj = {}
//         technicianName.forEach(function (x) { obj[x] = (obj[x] || 0) + 1; });
//         var name
//         var count
//         name = (Object.keys(obj))
//         count = (Object.values(obj))
//         // console.log(obj);
//         res.status(201).json({ label: name, count })
//         console.log({ label: name, count });

//         console.log("res send");

//     } catch (error) {
//         res.status(400).json({ error: error })
//         console.log(error);
//     }
// }