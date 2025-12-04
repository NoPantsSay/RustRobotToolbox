import { Button } from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLayouts } from "../../stores/useLayouts";
import { eventBus } from "../../utils/eventBus";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";

export function TopLeftSidebarButton() {
  const tooltipId = useId();
  const { getCurrentLayout } = useLayouts();
  const currentlayout = getCurrentLayout();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (currentlayout) {
      setIsOpen(currentlayout.isLeftSidebarOpen);
    }
  }, [currentlayout]);

  return (
    <>
      <Button
        onClick={() => {
          eventBus.emit("setleftsidebar", !isOpen);
        }}
        className="p-3 hover:bg-hover-background cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={
          isOpen ? "Hide left Sidebar" : "Show left Sidebar"
        }
        data-tooltip-place="bottom"
      >
        {isOpen ? (
          <VscLayoutSidebarLeft size={20} />
        ) : (
          <VscLayoutSidebarLeftOff size={20} />
        )}
      </Button>
      <TooltipWithPortal id={tooltipId} />
    </>
  );
}
