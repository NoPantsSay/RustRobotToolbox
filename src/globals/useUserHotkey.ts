import { create } from "zustand";

interface userHotkeyState {
  openFileHotkey: string;
  openConnectHotkey: string;
}

export const useUserHotkey = create<userHotkeyState>()(() => ({
  openFileHotkey: "Ctrl+O",
  openConnectHotkey: "Ctrl+Shift+O",
}));
