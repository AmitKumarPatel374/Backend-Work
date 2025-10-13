const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const restPassTemp = require("../utils/email.template");
const sendMail = require("../services/mail.services");


const registerController = async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "user alredy exists!",
                user: existingUser
            })
        }

        let hashPass = await bcrypt.hash(password, 11);
        let newUser = await userModel.create({
            name,
            email,
            mobile,
            password: hashPass
        })

        let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        }
        )

        res.cookie("token", token);

        return res.status(201).json({
            message: "user registered successfully!",
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}
const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "user not found!",
                user: user
            })
        }

        let comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return res.status(400).json({
                message: "Invlaid crediantials"
            })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        }
        )

        res.cookie("token", token);

        return res.status(200).json({
            message: "user logged in successfully!",
            user: user
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}

const logoutController = async (req, res) => {
    try {
        
        let token = req.cookies.token;

        if (!token) {
            return res.status(404).json({
                message:"token not found"
            })
        }

        res.clearCookie("token");
        return res.status(200).json({
            message: "user logged out successfully!",
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        
        let {email} = req.body;

        let user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({
                message:"user not found"
            })
        }

        let resetToken = jwt.sign({id:user._id},process.env.JWT_RAW_SECRET,{
            expiresIn:"10m"
        })

        let resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`

        let resetTemp = restPassTemp(user.name,resetLink);

        let emailData = await sendMail(
            email,
            "Reset Password",
            resetTemp
        )

        return res.status(200).json({
            message: "reset link sended!",
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    forgotPasswordController
}