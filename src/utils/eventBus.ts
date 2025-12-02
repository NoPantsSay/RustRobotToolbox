import mitt from "mitt";

type AppEvents = {
  addpanel: string; // 添加面板
  toggleleftsidebar: undefined; // 切换左侧边栏显示状态
  togglerightsidebar: undefined; // 切换右侧边栏显示状态
  // 通配符（mitt v3+ 支持）
  // biome-ignore lint/suspicious/noExplicitAny: just ingore
  "**": { type: keyof AppEvents; payload: any };
};

export const eventBus = mitt<AppEvents>();

// 可选：导出类型，方便其他地方使用
export type { AppEvents };
