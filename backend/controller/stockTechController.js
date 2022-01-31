const stockTech = require('../model/stockTechSchema')


//adding stock into the database
exports.postStockTech = (req, res)=>{
    try {
        console.log(req.body);
        var store = new stockTech(req.body).save()
        res.status(201).json({message:"stock has been Alloted"})
        console.log(`Stock alloted to ${req.body.techname}`);
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

//sending stock to the client
exports.getStockTech = async (req, res)=>{
    try {
        console.log(req.params.id);
        const data = await stockTech.findById(req.params.id)
        res.status(200).send(data)
        console.log("data sent");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

//update stock
exports.putStockTech = async(req, res)=>{
    try {
        const update = await stockTech.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "updated successfully"})
        console.log("stock Updated");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}

//deleteing stocks
exports.deleteStockTech = async(req, res)=>{
    try {
        const deleteStockTech = await stockTech.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Deleted successfully"})
        console.log("stock Deleted");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}
