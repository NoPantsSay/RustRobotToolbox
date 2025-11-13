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
  currentTheme: keyof Omit<typeof ThemeType, "SYSTEM">;
  setTheme: (input: ThemeType) => void;
  setcurrentTheme: (input: keyof Omit<typeof ThemeType, "SYSTEM">) => void;
}

export const useTheme = create<themeState>()(
  persist(
    (set) => ({
      theme: ThemeType.SYSTEM,
      currentTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "DARK"
        : "LIGHT",
      setTheme: (input: ThemeType) => {
        let currentTheme: keyof Omit<typeof ThemeType, "SYSTEM"> =
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "DARK"
            : "LIGHT";
        if (input === ThemeType.DARK) {
          currentTheme = "DARK";
        } else if (input === ThemeType.LIGHT) {
          currentTheme = "LIGHT";
        }
        set({ theme: input, currentTheme });
      },
      setcurrentTheme: (input: keyof Omit<typeof ThemeType, "SYSTEM">) => {
        set({ currentTheme: input });
      },
    }),
    {
      name: "theme", // unique name
      storage: createJSONStorage(() => defaultTauriStorage),
    },
  ),
);

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    console.log("系统切换至深色模式");
    if (useTheme.getState().theme === ThemeType.SYSTEM) {
      useTheme.getState().setcurrentTheme("DARK");
    }
  } else {
    console.log("系统切换至浅色模式");
    if (useTheme.getState().theme === ThemeType.SYSTEM) {
      useTheme.getState().setcurrentTheme("LIGHT");
    }
  }
});
