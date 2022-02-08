const mongoose=require("mongoose")

const teamAllotmentSchema=mongoose.Schema({
    admin : String,
    team_memeber: Array,
});

module.exports= new mongoose.model("teamaAllotment",teamAllotmentSchema)