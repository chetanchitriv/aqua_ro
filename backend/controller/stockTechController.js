const stockTech = require('../model/stockTechSchema')


//adding stock into the database
exports.postStockTech = async (req, res) => {
    try {
        console.log(req.body);
        const store =await new stockTech(req.body).save()
        res.send(store)
        console.log(`Stock alloted to ${req.body.techname}`);
    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}

//sending stock to the client
exports.getStockTech = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await stockTech.findById(req.params.id)
        res.status(200).send(data)
        console.log("data sent");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}
//sending stock to the client
exports.getallStockTech = async (req, res) => {
    try {

        const data = await stockTech.find()
        res.status(200).send(data)
        console.log("data sent");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}

//update stock
exports.putStockTech = async (req, res) => {
    try {
        const update = await stockTech.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: "updated successfully" })
        console.log("stock Updated");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}

//deleteing stocks
exports.deleteStockTech = async (req, res) => {
    try {
        const deleteStockTech = await stockTech.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Deleted successfully" })
        console.log("stock Deleted");

    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}


exports.stockOperations = async (req, res) => {
    try {
        // console.log(req.params.id);
        const findStock = await stockTech.findById(req.params.id)
        // console.log(req.body.itemList.map(data=>data));
        // var dataqnt = findStock.itemList.map(data=>data.spare_name)
        var dataqnt = findStock.itemList.map(data=>data)
        // console.log(dataqnt);
        var comingqnt = req.body.itemList.map(data=>data)
        // console.log(Object.values(dataqnt));
        const cmgObj = Object.values(comingqnt)
        const objdata = Object.values(dataqnt)
        var newStockList = []
        for(x in objdata){
            for(y in cmgObj){
                if(objdata[x].spare_name==cmgObj[y].spare_name){
                    objdata[x].qnt = objdata[x].qnt-cmgObj[y].qnt
                    newStockList.push(objdata)
                    // console.log(objdata);
                }
            }
        }
        console.log(newStockList, "hello");
        // console.log(Object.values(comingqnt));
        // console.log(dataqnt, comingqnt);
        // for(x in dataqnt, comingqnt)




        // var comingSpareName = req.body.itemList.map(data=>data.spare_name)
        // console.log(findStock.itemList.map(data=>data.qnt));
        // var dataSpareName = findStock.itemList.map(data=>data.spare_name)
        // if(findStock){
        //     if(comingSpareName==dataSpareName)
        // }
        // console.log(dataqnt-comingqnt);
        // const substract = findStock.map(data=> data.itemList).map(data=>data.qnt)
        // const substract = findStock.
        // console.log(substract);
        res.send("done")


    } catch (error) {
        res.status(400).json({ error: error })
        console.log(error);

    }
}
