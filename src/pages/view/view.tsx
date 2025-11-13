import { useEffect, useEffectEvent, useState } from "react";
import { useTitle } from "../../globals/useTitle";
import "../../styles/rc-dock.css";
import clsx from "clsx";
import {
  type ISplitviewPanelProps,
  Orientation,
  type SplitviewApi,
  SplitviewReact,
  type SplitviewReadyEvent,
  themeDark,
  themeLight,
} from "dockview-react";
import { useLayouts } from "../../stores/useLayouts";
import "dockview-react/dist/styles/dockview.css";
import { useTheme } from "../../stores/useTheme";
import { LeftSidebar } from "./leftsidebar/leftsidebar";
import { RightSidebar } from "./rightsidebar/rightsidebar";

const components = {
  main: (props: ISplitviewPanelProps) => {
    return <div>Panel {props.api.id}</div>;
  },
  leftsidebar: LeftSidebar,
  rightsidebar: RightSidebar,
};

export function View() {
  const { currentTheme } = useTheme();
  const setTitle = useTitle((state) => state.setTitle);
  useEffect(() => {
    setTitle("view");
  }, [setTitle]);

  const [api, setApi] = useState<SplitviewApi>();

  const { pushRecentLayout, getCurrentLayout, addLayout, updateLayout } =
    useLayouts();
  const currentlayout = getCurrentLayout();

  const onReady = (event: SplitviewReadyEvent) => {
    setApi(event.api);

    event.api.addPanel({
      index: 1,
      id: "main",
      component: "main",
      size: event.api.width * 0.6,
      minimumSize: 100,
    });
    event.api.addPanel({
      index: 0,
      id: "leftsidebar",
      component: "leftsidebar",
      size: event.api.width * 0.2,
      minimumSize: 100,
    });
    event.api.addPanel({
      index: 2,
      id: "rightsidebar",
      component: "rightsidebar",
      size: event.api.width * 0.2,
      minimumSize: 100,
    });
  };

  const addDefaultLayout = useEffectEvent(() => {
    const uuid = addLayout("default");
    updateLayout(uuid, { lastOpened: new Date() });
    pushRecentLayout(uuid);
  });

  useEffect(() => {
    if (currentlayout) {
      if (!api) {
        return;
      }

      const leftplane = api.getPanel("leftsidebar");
      if (leftplane) {
        if (currentlayout.isLeftSidebarOpen) {
          leftplane.api.setVisible(true);
        } else {
          leftplane.api.setVisible(false);
        }
      }

      const rightplane = api.getPanel("rightsidebar");
      if (rightplane) {
        if (currentlayout.isRightSidebarOpen) {
          rightplane.api.setVisible(true);
        } else {
          rightplane.api.setVisible(false);
        }
      }
    } else {
      addDefaultLayout();
    }
  }, [currentlayout, api]);

  return (
    <SplitviewReact
      className={clsx(
        currentTheme === "DARK" ? themeDark.className : themeLight.className,
      )}
      orientation={Orientation.HORIZONTAL}
      onReady={onReady}
      components={components}
    />
  );
}
