import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { IconType } from "react-icons";
import { useDarkMode } from "react-theme-detector";
import { Tooltip } from "react-tooltip";
import { ThemeType, useTheme } from "../../stores/useTheme";

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
  const [isDark, setIsDark] = useState(false);
  const theme = useTheme((state) => state.theme);
  const isDarkMode = useDarkMode();
  const displayContent = hotkey;

  useEffect(() => {
    if (
      theme === ThemeType.DARK ||
      (theme === ThemeType.SYSTEM && isDarkMode)
    ) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme, isDarkMode]);

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
          "w-full flex flex-row min-h-8 py-1 px-4 gap-2 items-center cursor-pointer",
          isActive
            ? "bg-scheme-background hover:bg-scheme-hover-background"
            : "hover:bg-hover-background ",
        )}
        data-tooltip-id={tooltipId}
        data-tooltip-content={displayContent}
        data-tooltip-place="right"
        data-tooltip-variant={isDark ? "dark" : "light"}
      >
        {Icon && <Icon size={20} className="text-scheme" />}
        {label}
      </Button>

      <Tooltip id={tooltipId} />
    </div>
  );
}
