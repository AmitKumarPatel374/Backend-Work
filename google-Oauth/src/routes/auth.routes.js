const express = require("express");
const passport = require("passport");

const router = express.Router();

//this is api of node and comes from home api and this api send req to google to authenticate user
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


//this api of google verify auth-code if right then redirect to profile or if failed then failed api
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/api/auth/google/failed" }),
    async (req, res) => {
        try {
            console.log("user-->", req.user);
            res.redirect("/api/auth/profile");
        } catch (error) {
            console.log("error in callback url->", error);
        }
    }
)

//failed api
router.get("/google/failed",(req,res)=>{
    res.send("tumse nahi ho payega");
})

//auth api after authentication
router.get("/profile",(req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
})

module.exports = router;