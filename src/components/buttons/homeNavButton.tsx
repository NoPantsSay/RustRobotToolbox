import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useId } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { IconType } from "react-icons";
import { Tooltip } from "react-tooltip";

export function HomeNavButton({
  onClick = () => {},
  hotkey = "",
  label,
  Icon,
  isActive,
}: Partial<{
  onClick: () => void;
  hotkey: string;
  label: string;
  Icon: IconType;
  isActive: boolean;
}>) {
  const tooltipId = useId();

  useHotkeys(
    hotkey,
    (e) => {
      e.preventDefault();
      onClick();
    },
    { enableOnFormTags: true },
  );

  return (
    <div>
      <Button
        onClick={onClick}
        className={clsx(
          "w-full flex flex-row min-h-8 py-1 gap-2 items-center cursor-pointer",
          isActive
            ? "bg-scheme-background hover:bg-scheme-hover-background"
            : "hover:bg-hover-background ",
          Icon ? "px-4" : "pl-6 pr-4",
        )}
        data-tooltip-id={tooltipId}
        data-tooltip-content={hotkey}
        data-tooltip-place="right"
      >
        {Icon && <Icon size={20} className="text-scheme" />}
        {label}
      </Button>

      <Tooltip
        id={tooltipId}
        style={{
          backgroundColor: `var(--color-background)`,
          color: `var(--color-foreground)`,
        }}
      />
    </div>
  );
}
