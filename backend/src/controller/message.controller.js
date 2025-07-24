import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggerInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggerInUserId } }).select("-password");// $ne:loggedinuserid means tells to moongose you should find all the user but not find the currently login user $ne is not equal expect password
        res.status(200).json(filterUsers);// gives all the user expect currectly logged in user
    } catch (error) {
        console.log("Error in getUsersForsidebar : ", error.message);
        res.status(500).json({ error: "Internal server error" });


    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [ // logical OR operator simple
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json(messages)
    } catch (error) {

        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ message: "Internal server Error" });

    }
};

export const sendMessages = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const {id:senderId} = req.user._id;

        let imageurl;
        if(image){
            //upload base64 image to cloudinary
            const uploadRespose = await cloudinary.uploader.upload(image);
            imageurl= uploadRespose.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageurl,
        });
        await newMessage.save();
        //todo : realtime functionallity socket.io
        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller : ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};