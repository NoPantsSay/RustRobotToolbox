import {
  type DockviewApi,
  DockviewReact,
  type DockviewReadyEvent,
  type IWatermarkPanelProps,
  themeDark,
  themeLight,
} from "dockview-react";
import { useEffect, useEffectEvent, useState } from "react";
import { useTheme } from "../../../stores/useTheme";
import { eventBus } from "../../../utils/eventBus";

const components = {
  default: () => {
    return null;
  },
};

const Watermark = (_props: IWatermarkPanelProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none pointer-events-none">
      <span> Watermark </span>
    </div>
  );
};

export function MainPanel() {
  const { currentTheme } = useTheme();
  const [api, setApi] = useState<DockviewApi>();

  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);
  };

  const addpanel = useEffectEvent((component: string) => {
    api?.addPanel({
      id: Date.now().toString(),
      component,
    });
  });

  useEffect(() => {
    eventBus.on("addpanel", (component) => {
      addpanel(component);
    });

    // 组件卸载时自动清理（防止内存泄漏）
    return () => {
      eventBus.off("addpanel");
    };
  }, []);

  return (
    <DockviewReact
      theme={currentTheme === "DARK" ? themeDark : themeLight}
      onReady={onReady}
      components={components}
      watermarkComponent={Watermark}
      disableFloatingGroups={true}
    />
  );
}
