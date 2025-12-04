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
      <div className="flex h-full items-center justify-between select-none text-foreground bg-second-background">
        <span>{props.api.title}</span>
        <div className="flex h-full items-center justify-end">
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
          <DockviewMenuButton />
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
