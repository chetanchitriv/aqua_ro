const mongoose=require("mongoose")

const teamAllotmentSchema=mongoose.Schema({
    admin : String,
    telecaller: Array,
    technician:Array
});

module.exports= new mongoose.model("teamaAllotment",teamAllotmentSchema)