"use client";

import { create } from "zustand";
import { clearAuthData, setItemLocalStorage } from "@/lib/utils";
import { Tokens, UserRole } from "@/types";
import { useEffect, useState } from "react";
import { getItemLocalStorage } from "@/lib/utils";
import { UserAuthState } from "@/types";

// This is just the store creation without any hydration logic
const createAuthStore = create<UserAuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,

  setToken: (token) => {
    set({ token, isAuthenticated: true });
    setItemLocalStorage(Tokens.User, token);
  },

  setUser: (user) => {
    set({ user });
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
    clearAuthData(UserRole.User);
  },

  // Method to initialize the store with values from localStorage
  initialize: (token, user) => {
    set({
      token,
      user,
      isAuthenticated: !!token,
    });
  },
}));

// This hook handles hydration and returns the store
const useAuthUser = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = createAuthStore();

  // Hydrate the store on the client side
  useEffect(() => {
    if (!isHydrated) {
      const token = getItemLocalStorage(Tokens.User);
      const userStr = getItemLocalStorage("user");
      const user = userStr ? JSON.parse(userStr) : null;

      store.initialize(token, user);
      setIsHydrated(true);
    }
  }, [isHydrated, store]);

  return {
    ...store,
    isHydrated,
  };
};

export default useAuthUser;
