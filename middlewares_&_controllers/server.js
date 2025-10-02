require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database/db")
const userRoute = require("./src/routes/user.routes")
const cookieParser = require("cookie-parser")

const app = express(); 

app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/user",userRoute);


let PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})