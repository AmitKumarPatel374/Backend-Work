const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const redisInstance = require("../services/cache.service");


const authMiddleware = async(req,res,next)=>{
    let token = req.cookies.token;

    if(!token){
        return res.status(404).json({
            message:"token not found"
        })
    }

    let isBlacklisted = await redisInstance.get(token);
    if(redisInstance){
        return res.status(404).json({
            message:"token block kar diya gya hai"
        })
    }


    let decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        return res.status(403).json({
            message:"invalid token"
        })
    }

    let user = await userModel.findById(decode.id);

    req.user = user;
    next();
}

module.exports = authMiddleware;