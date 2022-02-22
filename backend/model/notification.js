const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    name: { type: String },
    mobileNo: { type: Number },
    AltmobileNo: { type: Number },
    emailId: { type: String },
    assignTo: { type: String },
    address: { type: String },
    followUpmode: { type: String },
    followUpdate: { type: String },
    followUptime: { type: String },
    comment: { type: String },
    nextFollowupdate: { type: String },
    nextFollowuptime: { type: String },
    createdBy: { type: String },
    status: { type: String }
});

module.exports = mongoose.model("Notification", notificationSchema)