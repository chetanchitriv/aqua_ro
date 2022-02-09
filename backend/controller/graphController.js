const Lead = require('../model/Lead')


exports.getGraphTele = async (req, res) => {
    try {
        const lead = await Lead.find()
        var TelecallerName = []
        for(x in lead){
            TelecallerName.push(lead[x].cratedBy)
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

