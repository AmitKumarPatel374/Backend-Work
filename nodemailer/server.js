require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./src/config/database/db");
const userRoutes = require("./src/routes/user.routes");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/src/views"));

app.use("/api/auth",userRoutes)


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})