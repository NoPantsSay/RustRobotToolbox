// src/store/tauriStoreState.ts
import { load, type Store } from "@tauri-apps/plugin-store";
import type { StateStorage } from "zustand/middleware";

export class TauriStoreState implements StateStorage {
  private store: Store | null = null;

  constructor(public storename: string) {}

  async init() {
    // 初始化，加载指定名称的 Tauri Store
    this.store = await load(this.storename);
  }

  async getItem(name: string): Promise<string | null> {
    const res = await this.store?.get<string>(name);
    return res || null;
  }

  async setItem(name: string, value: string): Promise<void> {
    await this.store?.set(name, value);
    await this.store?.save(); // 直接保存，没有防抖
  }

  async removeItem(name: string): Promise<void> {
    await this.store?.delete(name);
    await this.store?.save(); // 直接保存
  }
}

// 创建并导出一个默认的已初始化实例
export const createTauriStorage = async (
  storename: string = "app-store.json",
) => {
  const storage = new TauriStoreState(storename);
  await storage.init();
  return storage;
};

// 或者直接导出一个默认实例
export const defaultTauriStorage = await createTauriStorage();
