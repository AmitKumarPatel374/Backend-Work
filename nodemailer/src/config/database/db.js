const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        let res = mongoose.connect(process.env.MONGO_URI);
        if (res) {
            console.log("mongodb connected");
            
        }
    } catch (error) {
        console.log("error in connection of mongoDB");
        
    }
}

module.exports = connectDB;