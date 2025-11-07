import { Button } from "@headlessui/react";
import { useId, useState } from "react";
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { Tooltip } from "react-tooltip";
import { useLayouts } from "../../stores/useLayouts";

export function TopLeftSidebarButton() {
  const tooltipId = useId();
  const { getRecentLayouts, updateLayout } = useLayouts();
  const recentlayouts = getRecentLayouts();
  const [isOpen, setIsOpen] = useState(
    recentlayouts.length > 0 ? recentlayouts[0].isLeftSidebarOpen : true,
  );

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
