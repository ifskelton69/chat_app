import { create } from "zustand";
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
            console.log("Error in chechAuth",error);
            
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    }
}))