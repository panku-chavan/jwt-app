import jwt from "jsonwebtoken";
import User from "../models/authModel.js";


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token=req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decode.id).select('_password');
            next();
        } catch (error) {
            res.status(401).json({
                messege: "Not Authorized!, Token Failed.",
                statusCode: 401,
                error: error
            });
        }
    }
    if (!token) {
        res.status(401).json({
            messege: "Not Authorized!, No Token Found.",
            statusCode: 401
        })
    }
}

export default protect;