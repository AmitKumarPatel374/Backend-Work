const mongoose = require('mongoose');

let connectDB = async () => {
    try{
       let res = mongoose.connect(process.env.MONGO_URI);
       if(res){
        console.log("Database connected");
       }
    }
    catch(err){
        console.log("error in db connecion->",err);
        
    }
}

module.exports = connectDB;