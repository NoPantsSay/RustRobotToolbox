import type { IDockviewPanelHeaderProps } from "dockview-react";
import { useEffect, useState } from "react";
import { eventBus } from "../../../utils/eventBus";
import { DockviewExpandButton } from "../buttons/dockviewExpandButton";
import { DockviewMenuButton } from "../buttons/dockviewMenuButton";
import { DockviewSettingButton } from "../buttons/dockviewSettingButton";

export const tabComponents = {
  default: (props: IDockviewPanelHeaderProps) => {
    const [maximized, setMaximized] = useState<boolean>(
      props.api.isMaximized(),
    );
    const [width, setWidth] = useState<number>(props.api.width);

    useEffect(() => {
      const disposables = [
        props.containerApi.onDidMaximizedGroupChange(({ isMaximized }) => {
          setMaximized(isMaximized);
        }),

        props.api.onDidDimensionsChange((dimensions) => {
          setWidth(dimensions.width);
        }),
      ];

      return () => {
        disposables.forEach((d) => {
          d.dispose();
        });
      };
    }, [props.containerApi, props.api]);

    return (
      <div
        className="grid grid-cols-[1fr_auto] h-full items-center select-none text-foreground bg-second-background"
        style={{ width: width }}
      >
        <div className="flex items-center overflow-hidden">
          <span className="px-1">{props.api.title}</span>
        </div>
        <div className="flex items-center justify-end overflow-hidden">
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
          <DockviewSettingButton
            onClick={() => {
              eventBus.emit("openpanelsettings");
            }}
          />
          <DockviewMenuButton props={props} maximized={maximized} />
        </div>
      </div>
    );
  },
  sidebar: (props: IDockviewPanelHeaderProps) => {
    return (
      <div className="flex h-full items-center justify-center select-none">
        <div>{props.api.title}</div>
      </div>
    );
  },
};
