import { getItemLocalStorage } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

const useAuthRedirectToast = (delay: number = 100) => {
  useEffect(() => {
    const reason = getItemLocalStorage("auth_redirect_reason");
    if (reason) {
      setTimeout(() => {
        toast.error(reason, { duration: 5000 });
        localStorage.removeItem("auth_redirect_reason");
      }, delay);
    }
  }, [delay]);
  return true;
};

export default useAuthRedirectToast;
