const Lead = require('../model/Lead')


//adding stock into the database
exports.getGraphTele = async (req, res) => {
    try {
        const lead = await Lead.find()
        var teleName = []
        for (x in lead) {
            teleName.push(lead[x].createdBy)
        }
        var obj = {}
        teleName.forEach(function (x) { obj[x] = (obj[x] || 0) + 1; });
        var name
        var count
        name = (Object.keys(obj))
        count = (Object.values(obj))
        console.log(obj);
        res.status(201).json({label:name,count })
        console.log("res send");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);
    }
}
