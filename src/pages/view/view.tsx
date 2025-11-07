import {
  DividerBox,
  type DockContext,
  DockLayout,
  type LayoutData,
  type PanelData,
  type TabGroup,
} from "rc-dock";
import { useEffect, useEffectEvent, useState } from "react";
import { useTitle } from "../../globals/useTitle";
import "../../styles/rc-dock.css";
import clsx from "clsx";
import { RcdockCloseButton } from "../../components/buttons/rcdockCloseButton";
import { type LayoutsInfo, useLayouts } from "../../stores/useLayouts";

const leftsideLayout: LayoutData = {
  dockbox: {
    id: "leftside",
    mode: "vertical",
    children: [
      {
        tabs: [
          {
            id: "plane",
            title: "plane",
            content: <></>,
            group: "leftsidebar",
          },
          {
            id: "topics",
            title: "topics",
            content: <></>,
            group: "leftsidebar",
          },
          {
            id: "problems",
            title: "problems",
            content: <></>,
            group: "leftsidebar",
          },
        ],
      },
    ],
  },
};

const viewLayout: LayoutData = {
  dockbox: {
    id: "view",
    mode: "horizontal",
    children: [
      {
        tabs: [
          {
            id: "main",
            title: "main",
            content: <></>,
            group: "view",
          },
        ],
      },
    ],
  },
};

const rightsideLayout: LayoutData = {
  dockbox: {
    id: "rightside",
    mode: "vertical",
    children: [
      {
        tabs: [
          {
            id: "variables",
            title: "variables",
            content: <></>,
            group: "rightsidebar",
          },
        ],
      },
    ],
  },
};

export function View() {
  const setTitle = useTitle((state) => state.setTitle);
  useEffect(() => {
    setTitle("view");
  }, [setTitle]);

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const { pushRecentLayout, getRecentLayouts, addLayout, updateLayout } =
    useLayouts();
  const recentlayouts = getRecentLayouts();

  const updateSidebar = useEffectEvent((layouts: LayoutsInfo[]) => {
    if (layouts.length > 0) {
      setIsLeftSidebarOpen(layouts[0].isLeftSidebarOpen);
      setIsRightSidebarOpen(layouts[0].isRightSidebarOpen);
    } else {
      const uuid = addLayout("default");
      updateLayout(uuid, { lastOpened: new Date() });
      pushRecentLayout(uuid);
    }
  });
  useEffect(() => {
    updateSidebar(recentlayouts);
  }, [recentlayouts]);

  const groups: {
    [key: string]: TabGroup;
  } = {
    leftsidebar: {
      floatable: false,
      maximizable: false,
      disableDock: true,
      tabLocked: true,
      panelExtra: (_panelData: PanelData, _context: DockContext) => {
        const buttons = [];
        buttons.push(
          <RcdockCloseButton
            onClick={() => {
              setIsLeftSidebarOpen(false);
              if (recentlayouts.length > 0) {
                updateLayout(recentlayouts[0].uuid, {
                  isLeftSidebarOpen: false,
                });
              }
            }}
          />,
        );
        return <div>{buttons}</div>;
      },
    },
    rightsidebar: {
      floatable: false,
      maximizable: false,
      disableDock: true,
      tabLocked: true,
      panelExtra: (_panelData: PanelData, _context: DockContext) => {
        const buttons = [];
        buttons.push(
          <RcdockCloseButton
            onClick={() => {
              setIsRightSidebarOpen(false);
              if (recentlayouts.length > 0) {
                updateLayout(recentlayouts[0].uuid, {
                  isRightSidebarOpen: false,
                });
              }
            }}
          />,
        );
        return <div>{buttons}</div>;
      },
    },
    view: {
      floatable: false,
      maximizable: true,
    },
  };

  return (
    <DividerBox mode="horizontal" className="h-full w-full">
      <div
        className={clsx(
          isLeftSidebarOpen ? "w-[50%] min-w-[100px]" : "w-[0%] min-w-0",
        )}
      >
        {isLeftSidebarOpen && (
          <DockLayout
            defaultLayout={leftsideLayout}
            style={{ width: "100%", height: "100%" }}
            groups={groups}
          />
        )}
      </div>
      <DockLayout
        defaultLayout={viewLayout}
        style={{ width: "100%", minWidth: 100 }}
        dropMode="edge"
        groups={groups}
      />
      <div
        className={clsx(
          isRightSidebarOpen ? "w-[50%] min-w-[100px]" : "w-[0%] min-w-0",
        )}
      >
        {isRightSidebarOpen && (
          <DockLayout
            defaultLayout={rightsideLayout}
            style={{ width: "100%", height: "100%" }}
            groups={groups}
          />
        )}
      </div>
    </DividerBox>
  );
}
