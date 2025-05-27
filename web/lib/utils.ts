import { Tokens, UserRole } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getItemLocalStorage = (key: string) => {
  if (typeof localStorage === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

export const setItemLocalStorage = (key: string, value: string) => {
  if (typeof localStorage === "undefined") {
    return null;
  }
  localStorage.setItem(key, value);
};

export const onError = (error: Error) => {
  const message = error.message || "Unknown Error Occurred";
  toast.error(message);
};

export const getTokenKey = (role: UserRole) => (role === UserRole.Admin ? Tokens.Admin : Tokens.User);

/**
 * @param role - The role of the user (UserRole.Admin or UserRole.User) whose authentication data will be cleared.
 * @param redirect - Optional object containing a reason for redirection. If provided, the reason is stored in localStorage and the user is redirected to the appropriate auth page.
 * @param redirect.reason - The reason for the redirection, which will be displayed as a popup on the auth page.
 */
export const clearAuthData = (role: UserRole, redirect?: { reason: string }) => {
  if (role === UserRole.Admin) {
    localStorage.removeItem(Tokens.Admin);
    // If redirect is specified with a reason, store reason and redirect to admin auth page
    if (redirect) {
      localStorage.setItem("auth_redirect_reason", redirect.reason);
      window.location.href = "/admin/auth";
    }
  } else {
    localStorage.removeItem(Tokens.User);
    localStorage.removeItem("user");
    localStorage.removeItem("mail_sended_email");
    if (redirect) {
      localStorage.setItem("auth_redirect_reason", redirect.reason);
      window.location.href = "/auth";
    }
  }
};
