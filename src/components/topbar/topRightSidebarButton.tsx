import { Button } from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import {
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { useLayouts } from "../../stores/useLayouts";
import { eventBus } from "../../utils/eventBus";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";

export function TopRightSidebarButton() {
  const tooltipId = useId();
  const { getCurrentLayout } = useLayouts();
  const currentlayout = getCurrentLayout();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (currentlayout) {
      setIsOpen(currentlayout.isRightSidebarOpen);
    }
  }, [currentlayout]);

  return (
    <>
      <Button
        onClick={() => {
          eventBus.emit("togglerightsidebar");
        }}
        className="p-3 hover:bg-hover-background cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={
          isOpen ? "Hide right Sidebar" : "Show right Sidebar"
        }
        data-tooltip-place="bottom"
      >
        {isOpen ? (
          <VscLayoutSidebarRight size={20} />
        ) : (
          <VscLayoutSidebarRightOff size={20} />
        )}
      </Button>
      <TooltipWithPortal id={tooltipId} />
    </>
  );
}
