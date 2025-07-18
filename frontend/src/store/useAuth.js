import { create } from "zustand";
import signUpPage from "../pages/signUpPage";
import { data } from "react-router-dom";
import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";
export const useAuth = create((set) => ({
    authUser: null,
    isLoggingUp: false,
    issingingUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in chechAuth", error);

            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (data) => {
        if (success === true) signUp(formData);
        set({ issingingUp: true });
        try {
            const res = await axiosInstance.post("/auth/signUp", data)
            toast.success("Account Created Successfully");
            set({ authUser: res.data });//user get authenticated as soon the fill the data
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({issingingUp:false});
        }

    }
}))