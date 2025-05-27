import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}
const useLoading = create<LoadingState>((set) => {
  return {
    isLoading: false,
    setLoading: (isLoading) => {
      set({ isLoading });
    },
  };
});
export default useLoading;
