import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultTauriStorage } from "./utils/tauriStoreState";

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

interface themeState {
  theme: ThemeType;
  setTheme: (input: ThemeType) => void;
}

export const useTheme = create<themeState>()(
  persist(
    (set) => ({
      theme: ThemeType.SYSTEM,
      setTheme: (input: ThemeType) => {
        set({ theme: input });
      },
    }),
    {
      name: "theme", // unique name
      storage: createJSONStorage(() => defaultTauriStorage),
    },
  ),
);
