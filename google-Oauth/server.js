require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authRoutes = require("./src/routes/auth.routes")

const app = express();
app.use(express.json());

//setup session express
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//configure google Oauth strategy and authenticate after comes request from /google by pass port to  authenticate user and this api send a auth-code to callback api that conatain user details
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Profile->", profile);
        return done(null, profile);
    } catch (error) {
        console.log("error in authenticate->", error);
        return done(error, null);
    }
}))

//set up serializer and deserilizer functions
passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

//routes api
app.use("/api/auth",authRoutes)

//home api that send request to node server
app.get('/',(req,res)=>{
    res.send('<h1>Home</h1><a href="/api/auth/google">Login with google</a>');
})

PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})