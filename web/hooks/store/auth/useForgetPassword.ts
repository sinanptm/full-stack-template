"use client";

import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils";
import { create } from "zustand";

interface ForgotPasswordState {
    email: string;

    setEmail: (email: string) => void;
    clear: () => void;
}

const useForgotPassword = create<ForgotPasswordState>((set, get) => {
    const storedEmail = getItemLocalStorage("forgotPassword_email") || "";

    return {
        email: storedEmail,

        setEmail: (email: string) => {

            setItemLocalStorage("forgotPassword_email", email);

            set({
                email,
            });
        },

        clear: () => {
            setItemLocalStorage("forgotPassword_email", "");

            set({
                email: "",
            });
        },
    };
});

export default useForgotPassword;
