"use client";

import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { ForgotPasswordState } from "@/types";
import { create } from "zustand";

const useMailSetter = create<ForgotPasswordState>((set) => {
  const storedEmail = getItemLocalStorage("mail_sended_email") || "";
  return {
    email: storedEmail,
    setEmail: (email: string) => {
      setItemLocalStorage("mail_sended_email", email);
      set({ email });
    },
    clear: () => {
      setItemLocalStorage("mail_sended_email", "");
      set({ email: "" });
    },
  };
});

export default useMailSetter;
