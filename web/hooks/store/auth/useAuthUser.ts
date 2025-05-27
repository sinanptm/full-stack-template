"use client";

import { create } from "zustand";
import { clearAuthData, getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { Tokens, UserRole } from "@/types";

type User = {
  name: string;
  id: string;
};

interface UserAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const useAuthUser = create<UserAuthState>((set) => {
  const token = getItemLocalStorage(Tokens.User);
  const user = getItemLocalStorage("user");

  return {
    isAuthenticated: !!token,
    token: token || null,
    user: user ? JSON.parse(user) : null,

    setToken: (token) => {
      set({ token, isAuthenticated: true });
      setItemLocalStorage(Tokens.User, token);
    },

    setUser: (user) => {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: () => {
      set({ token: null, user: null, isAuthenticated: false });
      clearAuthData(UserRole.User);
    },
  };
});

export default useAuthUser;
