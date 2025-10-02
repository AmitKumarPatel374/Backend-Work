const express = require("express");
const authMiddleware = require("../middleWares/auth.middleware");
const { registerController, loginController } = require("../controllers/auth.controllers");

const router = express.Router();
router.get("/home",authMiddleware, async (req,res)=>{
  res.send("i am home")
})

router.post("/register", registerController)

router.post("/login", loginController)

module.exports = router;