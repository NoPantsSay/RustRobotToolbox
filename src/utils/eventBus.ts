import type { AddPanelPositionOptions } from "dockview-react";
import mitt from "mitt";

type AppEvents = {
  addpanel: { component: string; position?: AddPanelPositionOptions }; // 添加面板
  setleftsidebar: boolean; // 设置左侧边栏显示状态
  setrightsidebar: boolean; // 设置右侧边栏显示状态
  openpanelsettings: undefined; // 打开面板设置
  setActiveMainPanelId: string; // 设置当前活动的主面板ID
  // 通配符（mitt v3+ 支持）
  // biome-ignore lint/suspicious/noExplicitAny: just ingore
  "**": { type: keyof AppEvents; payload: any };
};

export const eventBus = mitt<AppEvents>();

// 可选：导出类型，方便其他地方使用
export type { AppEvents };
