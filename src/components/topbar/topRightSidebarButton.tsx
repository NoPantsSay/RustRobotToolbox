import { Button } from "@headlessui/react";
import { useId, useState } from "react";
import {
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { Tooltip } from "react-tooltip";
import { useLayouts } from "../../stores/useLayouts";

export function TopRightSidebarButton() {
  const tooltipId = useId();
  const { getRecentLayouts, updateLayout } = useLayouts();
  const recentlayouts = getRecentLayouts();
  const [isOpen, setIsOpen] = useState(
    recentlayouts.length > 0 ? recentlayouts[0].isRightSidebarOpen : true,
  );

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
      <Tooltip
        id={tooltipId}
        style={{
          fontSize: "12px",
          lineHeight: "1.333",
          backgroundColor: `var(--color-tooltip-background)`,
          color: `var(--color-tooltip-foreground)`,
        }}
      />
    </>
  );
}
