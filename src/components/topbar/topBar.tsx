import { useLocation } from "react-router-dom";
import { useTitle } from "../../globals/useTitle";
import { TopAddPlanelButton } from "./topAddPanelButton";
import { TopHomeButton } from "./topHomeButton";
import { TopHomeDownButton } from "./topHomeDownButton";
import { TopLayoutDownButton } from "./topLayoutDownButton";
import { TopLeftSidebarButton } from "./topLeftSidebarButton";
import { TopRightSidebarButton } from "./topRightSidebarButton";
import { TopTimeZone } from "./topTimeZone";

export function TopBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const title = useTitle((state) => state.title);

  const isView = currentPath === "/view";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] min-h-11 justify-between items-center bg-second-background border-b border-border">
      <div>{isView ? <TopHomeDownButton /> : <TopHomeButton />}</div>
      <span className="text-center text-sm mx-auto">{title}</span>
      <div className="flex flex-row justify-end">
        {isView && <TopLayoutDownButton />}
        {isView && <TopAddPlanelButton />}
        {isView && <TopLeftSidebarButton />}
        {isView && <TopRightSidebarButton />}
        <TopTimeZone />
      </div>
    </div>
  );
}
