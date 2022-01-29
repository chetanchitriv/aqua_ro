const stock = require('../model/stockSchema')


//adding stock into the database
exports.postStock = (req, res)=>{
    console.log(req.body);
    var store = new stock(req.body).save()
    res.status(201).json({message:"stock has been added"})
    console.log("Stock added");

}

//sending stock to the client
exports.getStock = async (req, res)=>{
    console.log(req.params.id);
    const data = await stock.findById(req.params.id)
    res.status(200).send(data)
    console.log("data sent");
}

//update stock
exports.putStock = async(req, res)=>{
        const update = await stock.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "updated successfully"})
        console.log("stock Updated");
}

//deleteing stocks
exports.deleteStock = async(req, res)=>{
    const update = await stock.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Deleted successfully"})
    console.log("stock Deleted");
}
