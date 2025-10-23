import { Button } from "@headlessui/react";
import { useId } from "react";
import { TbSquarePlus2 } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

export function TopAddPlanelButton() {
  const tooltipId = useId();

  return (
    <>
      <Button
        className="p-3 hover:bg-hover-background cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={"Add panel"}
        data-tooltip-place="bottom"
      >
        <TbSquarePlus2 size={20} />
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
