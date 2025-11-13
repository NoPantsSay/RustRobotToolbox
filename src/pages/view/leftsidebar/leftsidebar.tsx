import {
  DockviewReact,
  type DockviewReadyEvent,
  themeDark,
  themeLight,
} from "dockview-react";
import { DockviewCloseButton } from "../../../components/buttons/dockviewCloseButton";
import { useLayouts } from "../../../stores/useLayouts";
import { useTheme } from "../../../stores/useTheme";
import { tabComponents } from "../components/tabComponents";

const components = {
  panel: () => {
    return null;
  },
  topics: () => {
    return null;
  },
  problems: () => {
    return null;
  },
};

const leftSidebarRightComponent = () => {
  const { getCurrentLayout, updateLayout } = useLayouts();
  const currentlayout = getCurrentLayout();

  return (
    <div className="flex h-full items-center justify-center">
      <DockviewCloseButton
        onClick={() => {
          if (currentlayout) {
            updateLayout(currentlayout.uuid, { isLeftSidebarOpen: false });
          }
        }}
      />
    </div>
  );
};

export function LeftSidebar() {
  const { currentTheme } = useTheme();

  const onReady = (event: DockviewReadyEvent) => {
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
