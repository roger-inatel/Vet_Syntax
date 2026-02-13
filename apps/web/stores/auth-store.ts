import { create } from "zustand";
import api from "../lib/api";

type AuthState = {
  token: string | null;
  isReady: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const setCookie = (token: string | null) => {
  if (typeof document === "undefined") {
    return;
  }

  if (!token) {
    document.cookie = "vet_token=; Max-Age=0; path=/";
    return;
  }

  document.cookie = `vet_token=${token}; Max-Age=86400; path=/`;
};

const setStorage = (token: string | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!token) {
    window.localStorage.removeItem("vet_token");
    return;
  }

  window.localStorage.setItem("vet_token", token);
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isReady: false,
  error: null,
  setToken: (token) => {
    setStorage(token);
    setCookie(token);
    set({ token });
  },
  login: async (email, password) => {
    set({ error: null });

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data?.token as string | undefined;

      if (!token) {
        throw new Error("Token not returned");
      }

      setStorage(token);
      setCookie(token);
      set({ token });
    } catch (error) {
      set({ error: "Login failed" });
      throw error;
    }
  },
  logout: () => {
    setStorage(null);
    setCookie(null);
    set({ token: null });
  },
}));
