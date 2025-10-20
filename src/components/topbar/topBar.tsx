import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/react.svg";
import { useTitle } from "../../globals/useTitle";
import { TitleTimeZone } from "./titleTimeZone";

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const title = useTitle((state) => state.title);

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
      <span className="text-center text-sm mx-auto">{title}</span>
      <TitleTimeZone />
    </div>
  );
}
