import jwt from 'jsonwebtoken'
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7D"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //milliseconds
        httpOnly: true, //prevent xss attacks cross-site scripting attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV != "development"//until you are in development phase this gonna be false
    })
    return token;
}
//expire in 7 days and user have to login again in 7 days