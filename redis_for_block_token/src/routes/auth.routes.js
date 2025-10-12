const mongoose = require("mongoose");
const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/home",authMiddleware,(req,res)=>{
    return res.send("main home me hu");
})

router.post("/register", registerController);
router.post("/login", loginController);
router.delete("/logout", logoutController);



module.exports = router;