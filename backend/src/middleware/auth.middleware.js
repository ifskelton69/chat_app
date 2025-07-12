import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;// we take jwt becus in utils we based jwt in res.cookie
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });//token not found
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);//in order to decode the token we have to pass same secret through which we created the token otherwise it will not going to work as we want 
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized:Invalid token" });//if decode fails 
        }
        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User Not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in Protected Route Middleware :",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}