const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
    workingHours: { type: Number },
    role: { type: String }
});

module.exports = mongoose.model("User", userSchema)