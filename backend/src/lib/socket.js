import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {}; // Fixed variable name

const getOnlineUsers = () => {
  return Object.keys(userSocketMap);
};

io.on('connection', (socket) => {
  console.log("A user connected: " + socket.id);
  
  const userId = socket.handshake.query.userId;
  console.log("User ID from query:", userId); // Debug log
  
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", getOnlineUsers());
  }

  socket.on('disconnect', () => {
    console.log("A user disconnected: " + socket.id);
    
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      console.log("User removed, online users:", getOnlineUsers()); 
      
      io.emit("getOnlineUsers", getOnlineUsers());
    }
  });
});

export { io, app, server, getOnlineUsers };