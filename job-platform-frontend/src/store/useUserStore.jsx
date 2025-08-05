import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  
  setUser: (user) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    set({ user });
  },

  updateUserCompanyId: (companyId) => 
    set((state) => {
      if (!state.user) return {};
      const updatedUser = { ...state.user, companyId };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
