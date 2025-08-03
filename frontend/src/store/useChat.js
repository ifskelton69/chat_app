import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUserLoading: false,
  onlineUsers: [], // Fixed: should be 'onlineUsers' not 'onlineUser'

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      console.log('Users API Response:', res.data);
      set({ users: res.data, isUserLoading: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // FIXED: Proper socket event listening
  listenToNewMessages: () => {
    const socket = useAuth.getState().socket;
    if (!socket) {
      console.log("Socket not available for listening");
      return;
    }

    console.log("Setting up newMessage listener");
    
    socket.on('newMessage', (newMessage) => {
      console.log("Received new message:", newMessage);
      
      const { selectedUser } = get();
      
      // FIXED: Check if message is from OR to the selected user
      const isMessageRelevant = 
        (newMessage.senderId === selectedUser?._id) || 
        (newMessage.receiverId === selectedUser?._id);
      
      if (!isMessageRelevant) {
        console.log("Message not relevant to current chat");
        return;
      }

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  // FIXED: Proper cleanup function name
  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    if (socket) {
      console.log("Removing newMessage listener");
      socket.off('newMessage');
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (selectedUser) {
      get().getMessages(selectedUser._id);
    }
  },
}));