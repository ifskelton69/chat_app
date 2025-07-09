import User from "../models/user.model.js";
import bcrypt from 'bcrypt.js'

export const signup = async(req, res) => {
  const {fullname,email,password} = req.body;
  try {
    if (password.length<6) {
      return res.status(400).json({message:"password must be atleast 6 letters"})
    }
    
    const user = await User.findOne({email})
    if(user) return res.status(400).json({message:` ${email}already exits`})
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt);  // hashing password with 10 combination
      const newUser = new User({
        fullname,
        email,
        password:hashedpassword,
      })

      if (newUser) { //jwt token generation 
        
      } else {
        res.status(400).json({message:"Invalid User data"})
      }
  } catch (error) {
    
  }
}
export const login = (req, res) => {
  res.send("signup route"); 
}
export const logout = (req, res) => {
  res.send("signup route"); 
}