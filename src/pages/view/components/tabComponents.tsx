import type { IDockviewPanelHeaderProps } from "dockview-react";

export const tabComponents = {
  default: (props: IDockviewPanelHeaderProps) => {
    return (
      <div className="flex h-full items-center justify-start select-none text-foreground bg-second-background">
        <span>{props.api.title}</span>
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
