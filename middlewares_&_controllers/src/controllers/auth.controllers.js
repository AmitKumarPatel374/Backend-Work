const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const registerController = async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "user already exists!",
                user: existingUser
            })
        }

        let hasedPass = await bcrypt.hash(password, 11);

        let newUser = await userModel.create({
            name,
            email,
            mobile,
            password: hasedPass
        })

        let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        res.cookie("ticket", token);

        return res.status(201).json({
            message: "user registered successfully!",
            user: newUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "error in register",
            error: error
        })
    }
}

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        let checkUser = await userModel.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({
                message: "user not found !"
            })
        }

        let comparePass = await bcrypt.compare(password, checkUser.password);

        if (!comparePass) {
            return res.status(401).json({
                message: "Invalid crediantial"
            })
        }

        let token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        res.cookie("ticket", token);

        return res.status(200).json({
            message: "user logged in successfully!",
            user: checkUser,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in login",
            error: error
        })
    }

}

module.exports = {
    registerController,
    loginController
}