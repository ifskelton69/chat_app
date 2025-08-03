import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.js"; 
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

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Fix: Remove destructuring, use direct access

        // Validation: Check if at least text or image is provided
        if (!text && !image) {
            return res.status(400).json({ message: "Message must contain text or image" });
        }

        let imageUrl;
        if (image) {
            try {
                // Upload base64 image to cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.log("Error uploading image to cloudinary: ", uploadError.message);
                return res.status(400).json({ message: "Failed to upload image" });
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Emit the new message to the receiver's socket
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } 
        res.status(201).json(newMessage); // 201 for created resource
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};