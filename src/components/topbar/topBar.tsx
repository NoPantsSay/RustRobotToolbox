import { Button } from "@headlessui/react";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/react.svg";
import { TitleTimeZone } from "./titleTimeZone";

const titles = new Map<string, string>([
  ["/home/dashboard", "home.dashboard"],
  ["/home/devices", "home.devices"],
  ["/home/recordings", "home.recordings"],
  ["/home/events", "home.events"],
  ["/home/timeline", "home.timeline"],
  ["/home/layouts", "home.layouts"],
  ["/settings/general", "setting.settings"],
  ["/settings/extensions", "setting.settings"],
  ["/settings/desktop", "setting.settings"],
]);

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const title = titles.get(currentPath);

  const isDisableReturnHome = currentPath === "/home/dashboard";

  return (
    <div
      data-tauri-drag-region
      className="flex flex-row min-h-11 justify-between items-center bg-second-background border-b border-border"
    >
      <Button
        disabled={isDisableReturnHome}
        onClick={() => {
          navigate("/home/dashboard");
        }}
        className={clsx("py-1.5 px-1.5", {
          "hover:bg-hover-background cursor-pointer": !isDisableReturnHome,
        })}
      >
        <img src={Logo} alt="logo" width={32} height={32} />
      </Button>
      <span className="text-center text-sm mx-auto">
        {title && <FormattedMessage id={title} />}
      </span>
      <TitleTimeZone />
    </div>
  );
}
