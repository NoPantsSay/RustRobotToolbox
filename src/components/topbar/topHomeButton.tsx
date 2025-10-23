import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/react.svg";

export function TopHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isDisableReturnHome = currentPath === "/home/dashboard";

  return (
    <Button
      disabled={isDisableReturnHome}
      onClick={() => {
        navigate("/home/dashboard");
      }}
      className={clsx("py-2.5 px-2.5", {
        "hover:bg-hover-background cursor-pointer": !isDisableReturnHome,
      })}
    >
      <img src={Logo} alt="logo" width={24} height={24} />
    </Button>
  );
}
