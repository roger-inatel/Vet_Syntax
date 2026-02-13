import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,

  login: (token) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  },
}));

// NEXT_PUBLIC_API_URL=http://localhost:3001
