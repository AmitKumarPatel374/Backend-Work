const express = require("express");

const app = express()
const mongoose = require("mongoose")
const userModel = require("./src/model/user.model")

mongoose.connect("")
.then((res)=>console.log("mongoDb connected"))
.catch((err)=>{
    console.log("error->",err);
})
        
app.post("/create-user",async(req,res)=>{
    try {
        let userObj = {
            name:"amit",
            age:20,
            email:"amit@123",
            password:"123456"

        }

        let newUser = await userModel.create({
            name:userObj.name,
            age:userObj.age,
            email:userObj.email,
            password:userObj.password
        })
        console.log(newUser);

        res.send({message:"user created",user:newUser});
        

    } catch (error) {
        console.log("error->",error);
    }
})


app.listen(3000,()=>{
    console.log("running on port 3000");
})