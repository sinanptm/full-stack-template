"use client";

import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { create } from "zustand";

interface ForgotPasswordState {
    email: string;

    setEmail: (email: string) => void;
    clear: () => void;
}

const useMailSetter = create<ForgotPasswordState>((set, get) => {
    const storedEmail = getItemLocalStorage("mail_sended_mail") || "";

    return {
        email: storedEmail,

        setEmail: (email: string) => {

            setItemLocalStorage("mail_sended_mail", email);

            set({
                email,
            });
        },

        clear: () => {
            setItemLocalStorage("mail_sended_mail", "");

            set({
                email: "",
            });
        },
    };
});

export default useMailSetter;
