import { create } from "zustand";

// Get initial theme and apply it immediately
const initialTheme = localStorage.getItem("chat-theme") || "coffee";
document.documentElement.setAttribute("data-theme", initialTheme);

export const useTheme = create((set) => ({
  theme: initialTheme,
  
  setTheme: (theme) => {
    // Save to localStorage
    localStorage.setItem("chat-theme", theme);
    
    // Apply theme to DOM immediately
    document.documentElement.setAttribute("data-theme", theme);
    
    // Update store state
    set({ theme });
  },
}));