let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const authMiddleware = async (req, res, next) => {

    try {
        let token = req.cookies.ticket;

        if (!token) {
            return res.status(404).json({
                message: "token not found!"
            })
        }

        let decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(403).json({
                message: "Invalid token!"
            })
        }

        let user = await userModel.findById(decode.id);
        req.user = user;
        next();
    } catch (error) {
      return res.status(400).json({
        message:"error in token",
        error:error
      })
    }
}

module.exports= authMiddleware;