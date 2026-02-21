import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  sponsorId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  // Modal control
  loginModalOpen: boolean;
  signupModalOpen: boolean;
  setLoginModalOpen: (v: boolean) => void;
  setSignupModalOpen: (v: boolean) => void;
  // Auth actions
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loginModalOpen: false,
      signupModalOpen: false,
      setLoginModalOpen: (v) =>
        set({ loginModalOpen: v, signupModalOpen: false }),
      setSignupModalOpen: (v) =>
        set({ signupModalOpen: v, loginModalOpen: false }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "nova-auth",
      partialize: (s) => ({
        user: s.user,
        token: s.token,
        isAuthenticated: s.isAuthenticated,
      }),
    },
  ),
);
