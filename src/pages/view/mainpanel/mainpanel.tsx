import {
  type DockviewApi,
  DockviewReact,
  type DockviewReadyEvent,
  type IDockviewHeaderActionsProps,
  type IWatermarkPanelProps,
  themeDark,
  themeLight,
} from "dockview-react";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useTheme } from "../../../stores/useTheme";
import { eventBus } from "../../../utils/eventBus";
import { DockviewExpandButton } from "../buttons/dockviewExpandButton";
import { DockviewMenuButton } from "../buttons/dockviewMenuButton";
import { DockviewSettingButton } from "../buttons/dockviewSettingButton";
import { tabComponents } from "../components/tabComponents";

const components = {
  default: () => {
    return null;
  },
};

const watermark = (_props: IWatermarkPanelProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none pointer-events-none">
      <span> Watermark </span>
    </div>
  );
};

const mainPanelRightComponent = (props: IDockviewHeaderActionsProps) => {
  const [maximized, setMaximized] = useState<boolean>(props.api.isMaximized());

  const groupCounts = useMemo(() => {
    return props.containerApi.groups.length;
  }, [props.containerApi.groups.length]);

  useEffect(() => {
    const disposable = props.containerApi.onDidMaximizedGroupChange(
      ({ isMaximized }) => {
        setMaximized(isMaximized);
      },
    );

    return () => {
      disposable.dispose();
    };
  }, [props.containerApi]);

  return (
    <div className="flex h-full items-center justify-center text-foreground bg-second-background">
      {groupCounts > 1 && (
        <DockviewExpandButton
          isExpand={!maximized}
          onClick={() => {
            if (maximized) {
              props.api.exitMaximized();
            } else {
              props.api.maximize();
            }
          }}
        />
      )}
      <DockviewSettingButton />
      <DockviewMenuButton />
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
    if (!api) {
      return;
    }

    const panel = api.addPanel({
      id: Date.now().toString(),
      component,
      tabComponent: "default",
      position: {
        direction: "left",
      },
    });

    panel.group.locked = true;
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
      tabComponents={tabComponents}
      rightHeaderActionsComponent={mainPanelRightComponent}
      watermarkComponent={watermark}
      disableFloatingGroups={true}
      singleTabMode="fullwidth"
    />
  );
}
