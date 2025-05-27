"use client";

import { create } from "zustand";
import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { Tokens } from "@/types";

interface AdminAuthState {
  isAuthenticated: boolean;

  token: string | null;

  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthAdmin = create<AdminAuthState>((set) => {
  const token = getItemLocalStorage(Tokens.Admin);

  return {
    isAuthenticated: !!token,
    token: token || null,

    setToken: (token) => {
      set({ token, isAuthenticated: true });
      setItemLocalStorage(Tokens.Admin, token);
    },

    logout: () => {
      set({ token: null, isAuthenticated: false });
      localStorage.removeItem(Tokens.Admin);
    },
  };
});

export default useAuthAdmin;
