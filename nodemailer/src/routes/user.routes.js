const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerController, loginController, logoutController, forgotPasswordController } = require("../controllers/auth.controller");
const userModel = require("../model/user.model");

const router = express.Router();

router.get("/reset-password/:token", async (req, res) => {
    try {
        let token = req.params.token;

        if (!token) {
            return res.status(404).json({
                message: "token not found"
            })
        }

        let decode = jwt.verify(token, process.env.JWT_RAW_SECRET);
        if (!decode) {
            return res.status(404).json({
                message: "Invalid token"
            })
        }

        return res.render("index.ejs", { id: decode.id });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }

})

router.post("/update-password/:id", async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        let { password } = req.body;
        console.log(password);

        let hashPass = await bcrypt.hash(password, 11);

        let user = await userModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                password: password
            },
            {
                new: true
            }
        )

        console.log(user);
        return res.status(200).json({
            message: "password updared successfully!",
            updatedUser: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!",
            error: error
        })
    }

})


router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/logout", logoutController);

router.post("/forgot-password", forgotPasswordController);

module.exports = router;


