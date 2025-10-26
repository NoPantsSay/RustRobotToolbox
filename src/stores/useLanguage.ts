import { setDefaultOptions } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import { flatten } from "flat";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import enMessages from "../locales/en.json";
import zhMessages from "../locales/zh.json";
import { defaultTauriStorage } from "./utils/tauriStoreState";

const messages = new Map<string, Record<string, string>>([
  ["en", flatten(enMessages)],
  ["zh", flatten(zhMessages)],
]);

function setDefaultLocal(language: string) {
  // 设置全局语言环境
  if (language === "zh") {
    setDefaultOptions({ locale: zhCN });
  } else {
    setDefaultOptions({ locale: enUS });
  }
}
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
        setDefaultLocal(input);
      },
      getMessage: () => {
        const currentLocale = get().language;
        return messages.get(currentLocale);
      },
    }),
    {
      name: "language", // unique name
      storage: createJSONStorage(() => defaultTauriStorage),
      onRehydrateStorage: () => (state) => {
        console.log("加载语言", state);
        setDefaultLocal(state?.language || "zh");
      },
    },
  ),
);
