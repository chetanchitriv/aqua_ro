const mongoose=require("mongoose")

const teamAllotmentSchema=new mongoose.Schema({
    admin : String,
    team_memeber: Array,
});

module.exports=mongoose.model("teamaAllotment",teamAllotmentSchema)