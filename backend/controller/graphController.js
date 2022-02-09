const Lead = require('../model/Lead')
const User = require('../model/User')

exports.getGraphTele = async (req, res) => {
    try {
        const lead = await Lead.find()
        // console.log(lead[0].);
        var TelecallerName = []
        for (x in lead) {
            const UserRolecheck = await User.findOne({ userName: lead[x].createdBy })
            if (UserRolecheck) {

                console.log(`${UserRolecheck.userName} Role is ${UserRolecheck.role}`);
                if (UserRolecheck.role == "Telecaller") {
                    TelecallerName.push(lead[x].createdBy)
                }
            }
        }
        var obj = {}
        TelecallerName.forEach(function (x) { obj[x] = (obj[x] || 0) + 1; });
        var name
        var count
        name = (Object.keys(obj))
        count = (Object.values(obj))
        // console.log(obj);
        res.status(201).json({ label: name, count })
        console.log("res send");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}

exports.getGraphTechnician = async (req, res) => {
    try {
        const lead = await Lead.find()
        var technicianName = []
        for (x in lead) {
            const UserRolecheck = await User.findOne({ userName: lead[x].createdBy })

            if (UserRolecheck) {
                console.log(`${UserRolecheck.userName} Role is ${UserRolecheck.role}`);
                if (UserRolecheck.role == "Technician") {
                    technicianName.push(lead[x].createdBy)
                }
            }
        }
        var obj = {}
        technicianName.forEach(function (x) { obj[x] = (obj[x] || 0) + 1; });
        var name
        var count
        name = (Object.keys(obj))
        count = (Object.values(obj))
        // console.log(obj);
        res.status(201).json({ label: name, count })
        console.log("res send");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}


