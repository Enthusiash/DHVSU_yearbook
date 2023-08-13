const mongoose = require("mongoose");
mongoose.pluralize(null);

const adminSchema = new mongoose.Schema({
    id: { type: String },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateRegistered: { type: Date, required: true }
});


module.exports = mongoose.model("admin_collection", adminSchema);