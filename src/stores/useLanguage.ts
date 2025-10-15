import { flatten } from "flat";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import enMessages from "../locales/en.json";
import zhMessages from "../locales/zh.json";

const messages = new Map<string, Record<string, string>>([
  ["en", flatten(enMessages)],
  ["zh", flatten(zhMessages)],
]);

interface LanguageState {
  language: string;
  setLanguage: (input: string) => void;
  getMessage: () => Record<string, string> | undefined;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "zh",
      setLanguage: (input: string) => {
        set({ language: input });
      },
      getMessage: () => {
        const currentLocale = get().language;
        return messages.get(currentLocale);
      },
    }),
    {
      name: "language", // unique name
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
