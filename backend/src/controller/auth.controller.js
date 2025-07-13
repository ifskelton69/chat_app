import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });//all field required <error></error>
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be atleast 6 letters" })
    }

    const user = await User.findOne({ email }) //it will check if user already exist or not
    if (user) return res.status(400).json({ message: ` ${email} already exits` })
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);  // hashing password with 10 combination
    const newUser = new User({
      fullname,
      email,
      password: hashedpassword,
    })

    if (newUser) { //jwt token generation 
      generateToken(newUser.id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser.id,
        fullname: newUser.fullname,
        profilepic: newUser.profilepic,
        email: newUser.email
      })


    } else {
      res.status(400).json({ message: "Invalid User data" })
    }
  } catch (error) {
    console.log("Error message in signup controller ", error.message);
    res.status(500).json({ message: "Internal server error" });//server error 


  }
};//end of singup work

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });//You should enter message as password is incorrect or anything through which malicious user cannot find that user is exist or not 
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);//compare encrpted password 
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
    })
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal server error" });//server error 

  }
}; //login

export const logout = (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 })//cookie age set to 0 so it means it expire immedietly and blank which means set cookie to to none
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ message: "Internal server error" })

  }
};//logout 

export const updateprofile = async (req, res) => {
try {
    const { profilepic } = req.body;
    const userId = req.user._id;
    if (!profilepic) {
      return res.status(400).json({ message: "Profile Picture is required" })//you cannot move forward until you provide profile picture
    }
    const uploadresponse = await cloudinary.uploader.upload(profilepic);//if you provide profile picture then we will upload it 
    const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadresponse.secure_url }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile : ", error.message);
    res.status(500).json({message:"Internal server Error"});
  }


};

export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user);//This will give you the authenticated user
  } catch (error) {
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}

