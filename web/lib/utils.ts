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