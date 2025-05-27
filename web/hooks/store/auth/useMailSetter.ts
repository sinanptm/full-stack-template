"use client";

import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { create } from "zustand";

interface ForgotPasswordState {
    email: string;
    setEmail: (email: string) => void;
    clear: () => void;
}

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
