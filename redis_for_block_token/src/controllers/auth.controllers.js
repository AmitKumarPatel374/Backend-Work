const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const redisInstance = require("../services/cache.service");


const registerController = async (req, res) => {
    console.log(req.body);
    try {
        let { name, email, mobile, password } = req.body;

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "user already exists!",
                user: existingUser
            })
        }

        let hashPassword = await bcrypt.hash(password, 11);

        let newUser = await userModel.create({
            name,
            email,
            mobile,
            password: hashPassword
        })

        let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.cookie("token", token);

        return res.status(201).json({
            message: "user registered successfully!",
            user: newUser
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "error in register!",
            error: error
        })
    }
}
const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "user not found!",
            })
        }

        let comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(401).json({
                message: "Invalid Crediantial !",
            })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.cookie("token", token);

        return res.status(200).json({
            message: "user logged in successfully!",
            user: user
        })

    } catch (error) {
        return res.status(500).json({
            message: "error in login!",
            error: error
        })
    }
}

const logoutController = async (req, res) => {
    try {
        let token = req.cookies.token;

        if(!token){
            return res.status(404).json({
                message:"token not found"
            })
        }

        await redisInstance.set(token, "blackListed");

        res.clearCookie("token");
        return res.status(200).json({
            message:"user logged out successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in logout!",
            error: error
        })
    }
}



module.exports = {
    registerController,
    loginController,
    logoutController,
};
