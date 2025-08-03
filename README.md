# 💬 Real-Time Chat App

A modern, real-time chat application built using **React**, **Zustand** for global state management, and **Socket.IO** for bi-directional real-time communication. This project enables seamless messaging with user authentication, online status indication, and file/image sharing.

## 🚀 Features

- 🔐 **Authentication System** (Login / Register)
- 💡 **Zustand** for lightweight global state
- 🟢 **Real-time Messaging** with Socket.IO
- 📸 **Image Upload & Preview**
- ✅ **Online/Offline User Status**
- 📅 **Date Dividers** (like WhatsApp)
- ⏰ **Time Formatting** (HH:MM AM/PM)
- 📱 **Responsive UI**
- 🔔 **Typing Indicators** *(optional future upgrade)*

## 🧑‍💻 Tech Stack

**Frontend:**
- React
- Zustand
- Socket.IO Client
- React Hot Toast
- TailwindCSS
- Lucide Icons

**Backend:**
- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- Cloudinary for media storage
- dotenv for environment variables

## 🛠️ Installation

### 1. Clone the Repository 

git clone https://github.com/ifskelton69/chat_app.git
cd chat_app
cd server
npm install
npm run dev

Project structure :

/client         - Frontend (React + Zustand)
/server         - Backend (Node + Express + Socket.IO)
/models         - Mongoose Schemas
/controllers    - Request Handlers
/routes         - Express Routes
/lib            - Axios instance, DB connection


Create .env in your backend add below field in it:

PORT=5001 #Your backend is running on this port 
MONGO_URI=your_mongo_uri #Your database cluster-URI
CLOUDINARY_CLOUD_NAME= #cloudinary is used to store user profile picture 
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret

📦 Future Improvements
🔍 Search users & messages
📞 Voice/Video calls
🔒 End-to-end encryption
📤 Media sharing (files, videos)
🗑️ Chat deletion
🌐 Group chat functionality
