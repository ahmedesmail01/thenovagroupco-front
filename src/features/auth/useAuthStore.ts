import { create } from "zustand";
import api from "../../lib/api";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  sponsorId: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  loginModalOpen: boolean;
  signupModalOpen: boolean;
  setLoginModalOpen: (v: boolean) => void;
  setSignupModalOpen: (v: boolean) => void;
  setUser: (user: User | null) => void;
  setBootstrapping: (v: boolean) => void;
  logoutLocal: () => void;
  bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isBootstrapping: true,
  loginModalOpen: false,
  signupModalOpen: false,

  setLoginModalOpen: (v) => set({ loginModalOpen: v, signupModalOpen: false }),

  setSignupModalOpen: (v) => set({ signupModalOpen: v, loginModalOpen: false }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setBootstrapping: (v) => set({ isBootstrapping: v }),

  logoutLocal: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  bootstrap: async () => {
    try {
      // Try to fetch the authenticated user — the browser sends
      // the httpOnly session cookie automatically with the request
      const res = await api.get("/user/data");
      const user = res.data?.user ?? res.data;
      set({
        user,
        isAuthenticated: true,
        isBootstrapping: false,
      });
    } catch {
      // No valid session
      set({
        user: null,
        isAuthenticated: false,
        isBootstrapping: false,
      });
    }
  },
}));

