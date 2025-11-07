import { Button } from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLayouts } from "../../stores/useLayouts";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";

export function TopLeftSidebarButton() {
  const tooltipId = useId();
  const { getRecentLayouts, updateLayout } = useLayouts();
  const recentlayouts = getRecentLayouts();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (recentlayouts.length > 0) {
      setIsOpen(recentlayouts[0].isLeftSidebarOpen);
    }
  }, [recentlayouts]);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
          if (recentlayouts.length > 0) {
            updateLayout(recentlayouts[0].uuid, { isLeftSidebarOpen: !isOpen });
          }
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
