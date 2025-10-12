require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require("./src/routes/auth.routes");
const redisInstance = require('./src/services/cache.service');
const connectDB = require('./src/config/database/db');


connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());


redisInstance.on("connect",()=>{
    console.log("redis connected successfully!");
    
})
redisInstance.on("error",(error)=>{
    console.log("error in redis!->",error);
    
})

const saveRedisData= async()=>{
    await redisInstance.set("users","mujhe nahi pta","EX",60);
}

app.use("/api/auth",userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});