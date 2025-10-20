import { create } from "zustand";

interface titleState {
  title: string;
  setTitle: (input: string) => void;
}

export const useTitle = create<titleState>()((set) => ({
  title: "",
  setTitle: (input: string) => {
    set({ title: input });
  },
}));
