import type { IDockviewPanelHeaderProps } from "dockview-react";

export const tabComponents = {
  sidebar: (props: IDockviewPanelHeaderProps) => {
    return (
      <div className="flex h-full items-center justify-center select-none">
        <div>{props.api.title}</div>
      </div>
    );
  },
};
