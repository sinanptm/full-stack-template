import { create } from "zustand";
import { setItemLocalStorage } from "@/lib/utils";
import { Tokens } from "@/types";
import { useEffect, useState } from "react";
import { getItemLocalStorage } from "@/lib/utils";
import { AdminAuthState } from "@/types";

const createAdminAuthStore = create<AdminAuthState>((set) => ({
  isAuthenticated: false,
  token: null,

  setToken: (token) => {
    set({ token, isAuthenticated: true });
    setItemLocalStorage(Tokens.Admin, token);
  },

  logout: () => {
    set({ token: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem(Tokens.Admin);
    }
  },

  initialize: (token) => {
    set({
      token,
      isAuthenticated: !!token,
    });
  },
}));

const useAuthAdmin = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = createAdminAuthStore();

  useEffect(() => {
    if (!isHydrated) {
      const token = getItemLocalStorage(Tokens.Admin);

      store.initialize(token);
      setIsHydrated(true);
    }
  }, [isHydrated, store]);

  return {
    ...store,
    isHydrated,
  };
};

export default useAuthAdmin;
