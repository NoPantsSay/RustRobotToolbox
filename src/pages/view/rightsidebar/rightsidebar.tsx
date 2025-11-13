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
  variables: () => {
    return null;
  },
  layout_history: () => {
    return null;
  },
};

const rightSidebarRightComponent = () => {
  const { getCurrentLayout, updateLayout } = useLayouts();
  const currentlayout = getCurrentLayout();

  return (
    <div className="flex h-full items-center justify-center">
      <DockviewCloseButton
        onClick={() => {
          if (currentlayout) {
            updateLayout(currentlayout.uuid, { isRightSidebarOpen: false });
          }
        }}
      />
    </div>
  );
};

export function RightSidebar() {
  const { currentTheme } = useTheme();

  const onReady = (event: DockviewReadyEvent) => {
    event.api.addPanel({
      id: "variables",
      title: "Variables",
      component: "variables",
      tabComponent: "sidebar",
    });

    event.api.addPanel({
      id: "layout_history",
      title: "Layout History",
      component: "layout_history",
      tabComponent: "sidebar",
    });
  };

  return (
    <DockviewReact
      theme={currentTheme === "DARK" ? themeDark : themeLight}
      onReady={onReady}
      components={components}
      tabComponents={tabComponents}
      rightHeaderActionsComponent={rightSidebarRightComponent}
      disableFloatingGroups={true}
      disableDnd={true}
    />
  );
}
