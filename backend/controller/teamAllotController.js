const teamAllotmentSchema = require('../model/teamallotment')


//adding stock into the database
exports.team_create = (req, res)=>{
    try {
        console.log(req.body);
        var store = new stock(req.body).save()
        res.status(201).json({message:"stock has been added"})
        console.log("Stock added");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
    }

}

//sending stock to the client
exports.team_details = async (req, res)=>{
    try {
        
        console.log(req.params.id);
        const data = await stock.findById(req.params.id)
        res.status(200).send(data)
        console.log("data sent");
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

exports.team_all = async (req, res)=>{
    try {
       
        const data = await stock.find()
        res.status(200).send(data)
        console.log("data sent");
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

//update stock
exports.team_update = async(req, res)=>{
    try {
        const update = await stock.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "updated successfully"})
        console.log("stock Updated");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

//deleteing stocks
exports.team_delete = async(req, res)=>{
    try {
        const deleteStock = await stock.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Deleted successfully"})
        console.log("stock Deleted");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}
