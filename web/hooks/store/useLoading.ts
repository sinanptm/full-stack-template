import { LoadingState } from "@/types";
import { create } from "zustand";

const useLoading = create<LoadingState>((set) => {
  return {
    isLoading: false,
    setLoading: (isLoading) => {
      set({ isLoading });
    },
  };
});
export default useLoading;
