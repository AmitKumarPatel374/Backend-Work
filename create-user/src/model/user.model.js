const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;