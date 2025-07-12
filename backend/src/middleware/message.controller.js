import User from "../models/user.model";

export const  getUserForSidebar = async (req,res)=>
{
    try {
        const loggerInUserId = req.user._id;
        const filterUsers = await User.find({_id:{$ne:loggerInUserId}}).select("-password");// $ne:loggedinuserid means tells to moongose you should find all the user but not find the currently login user $ne is not equal expect password
        res.status(200).json(filterUsers);// gives all the user expect currectly logged in user
    } catch (error) {
        console.log("Error in getUsersForsidebar : ", error.message);
        res.status(500).json({error : "Internal server error"});
        
        
    }
}