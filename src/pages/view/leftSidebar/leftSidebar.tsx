import {
  type DockviewApi,
  DockviewReact,
  type DockviewReadyEvent,
  themeDark,
  themeLight,
} from "dockview-react";
import { useEffect, useEffectEvent, useState } from "react";
import { useTheme } from "../../../stores/useTheme";
import { eventBus } from "../../../utils/eventBus";
import { DockviewCloseButton } from "../buttons/dockviewCloseButton";
import { tabComponents } from "../components/tabComponents";
import { Panel } from "./panel/panel";

const components = {
  panel: Panel,
  topics: () => {
    return null;
  },
  problems: () => {
    return null;
  },
};

const leftSidebarRightComponent = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <DockviewCloseButton
        onClick={() => {
          eventBus.emit("setleftsidebar", false);
        }}
      />
    </div>
  );
};

export function LeftSidebar() {
  const { currentTheme } = useTheme();
  const [api, setApi] = useState<DockviewApi>();

  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);

    event.api.addPanel({
      id: "panel",
      title: "Panel",
      component: "panel",
      tabComponent: "sidebar",
    });

    event.api.addPanel({
      id: "topics",
      title: "Topics",
      component: "topics",
      tabComponent: "sidebar",
    });

    event.api.addPanel({
      id: "problems",
      title: "Problems",
      component: "problems",
      tabComponent: "sidebar",
    });
  };

  const openpanelsettings = useEffectEvent(() => {
    if (!api) {
      return;
    }

    const panel = api.getPanel("panel");
    if (!panel) {
      return;
    }

    panel.api.setActive();
    eventBus.emit("setleftsidebar", true);
  });

  useEffect(() => {
    eventBus.on("openpanelsettings", () => {
      openpanelsettings();
    });

    // 组件卸载时自动清理（防止内存泄漏）
    return () => {
      eventBus.off("openpanelsettings");
    };
  }, []);

  return (
    <DockviewReact
      theme={currentTheme === "DARK" ? themeDark : themeLight}
      onReady={onReady}
      components={components}
      tabComponents={tabComponents}
      rightHeaderActionsComponent={leftSidebarRightComponent}
      disableFloatingGroups={true}
      disableDnd={true}
    />
  );
}
