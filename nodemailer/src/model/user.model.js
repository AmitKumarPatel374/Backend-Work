const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 10,
        minLength: 10,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

let userModel = mongoose.model("user",userSchema);
module.exports = userModel;