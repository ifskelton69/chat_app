import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';

export const useChat = create((set, get) => ({
    messages: [],
    users: [], // Fixed: was 'user', should be 'users' to match your component
    selectedUser: null,
    isMessageLoading: false,
    isUserLoading: false, // Fixed: was 'isUseLoading', should be 'isUserLoading'
    onlineUser: [], // Added this since your component expects it
    
    getUsers: async () => {
        set({isUserLoading: true});
        try {
            const res = await axiosInstance.get('/messages/users');
            console.log('Users API Response:', res.data); // Debug log
            set({users: res.data, isUserLoading: false}); // Fixed: set 'users' not 'user'
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            set({isUserLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data}); // Fixed: was 'message', should be 'messages'
        } catch (error) {
            toast.error('Failed to load messages');
        } finally {
            set({isMessageLoading: false});
        }
    },

    getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    }
  },

    setSelectedUser: (selectedUser) => {
        set({selectedUser});
        if (selectedUser) {
            // Fixed: use selectedUser._id instead of user._id
            get().getMessages(selectedUser._id);
        }
    },
}));