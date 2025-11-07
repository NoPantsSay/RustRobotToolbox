import { Button } from "@headlessui/react";
import { useEffect, useId, useState } from "react";
import {
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { useLayouts } from "../../stores/useLayouts";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";

export function TopRightSidebarButton() {
  const tooltipId = useId();
  const { getRecentLayouts, updateLayout } = useLayouts();
  const recentlayouts = getRecentLayouts();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (recentlayouts.length > 0) {
      setIsOpen(recentlayouts[0].isRightSidebarOpen);
    }
  }, [recentlayouts]);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
          if (recentlayouts.length > 0) {
            updateLayout(recentlayouts[0].uuid, {
              isRightSidebarOpen: !isOpen,
            });
          }
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
