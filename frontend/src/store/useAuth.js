import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],  
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      // get().connectSocket(); // Comment out until socket is properly set up
    } catch (error) {
      console.log("Error in checkAuth:", error);
      // Don't show error for checkAuth - it's expected when not logged in
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      // Try different endpoint variations based on your backend
      const res = await axiosInstance.post("/auth/signup", data); // Changed from signUp to signup
      set({ authUser: res.data });
      toast.success("Account created successfully");
      // get().connectSocket(); // Comment out until socket is properly set up
    } catch (error) {
      console.error("SignUp error:", error);
      
      // Better error handling
      let errorMessage = "Signup failed";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to server. Please check if your backend is running.";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid signup data";
      } else if (error.response?.status === 409) {
        errorMessage = "User already exists";
      }
      
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      // get().connectSocket(); // Comment out until socket is properly set up
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to server";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid credentials";
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      }
      
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      // get().disconnectSocket(); // Comment out until socket is properly set up
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      set({ authUser: null });
      toast.error("Logout failed, but cleared local session");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      
      let errorMessage = "Profile update failed";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Temporarily disable socket functions until properly configured
  connectSocket: () => {
    console.log("Socket connection disabled - uncomment and configure when ready");
    /*
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    */
  },
  
  disconnectSocket: () => {
    console.log("Socket disconnection disabled - uncomment and configure when ready");
    /*
    if (get().socket?.connected) get().socket.disconnect();
    */
  },

  // Add a test function to check server connectivity
  testConnection: async () => {
    try {
      const res = await axiosInstance.get("/health");
      console.log("✅ Server connection OK:", res.data);
      toast.success("Server connection successful");
      return true;
    } catch (error) {
      console.error("❌ Server connection failed:", error);
      toast.error("Cannot connect to server - check if backend is running");
      return false;
    }
  }
}));