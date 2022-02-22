const stock = require('../model/stockSchema')


//adding stock into the database
exports.postStock = (req, res)=>{
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
exports.getStock = async (req, res)=>{
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

exports.getStockByName = async (req, res)=>{
    console.log(req.params.spare);

    // try {
    //     const data = await stock.findOne(req.params.spare_name)
    //     res.status(200).send(data)
    //     console.log("data sent");
    // } catch (error) {
    //     res.status(400).json({error:error})
    //     console.log(error);
        
    // }
}

exports.getallStock = async (req, res)=>{
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
exports.putStock = async(req, res)=>{
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
exports.deleteStock = async(req, res)=>{
    try {
        const deleteStock = await stock.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Deleted successfully"})
        console.log("stock Deleted");
        
    } catch (error) {
        res.status(400).json({error:error})
        console.log(error);
        
    }
}
