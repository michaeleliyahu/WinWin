import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
