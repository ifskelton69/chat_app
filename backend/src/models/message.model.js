import mongoose from "mongoose";
const messageSchema =new mongoose.Schema(
{
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true,
    },
    receiverId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",//Tell Mongoose which collection to reference
        required : true,
    },
    text:{
        type : String,
    },
    image:{
        type : String,
    },
},
{timestamps:true}
);

const Message = mongoose.model("Message",MessageSchema);

export default Message;