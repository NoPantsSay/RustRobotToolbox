import { Button } from "@headlessui/react";
import { TbSquarePlus2 } from "react-icons/tb";
import { eventBus } from "../../utils/eventBus";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";

export function TopAddPlanelButton() {
  const tooltipId = "TopAddPlanelButtonTooltipId";

  return (
    <>
      <Button
        onClick={() => {
          eventBus.emit("addpanel", { component: "default" });
        }}
        className="p-3 hover:bg-hover-background cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={"Add panel"}
        data-tooltip-place="bottom"
      >
        <TbSquarePlus2 size={20} />
      </Button>
      <TooltipWithPortal id={tooltipId} />
    </>
  );
}
