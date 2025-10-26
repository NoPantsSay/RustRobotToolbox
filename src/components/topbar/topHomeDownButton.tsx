import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";
import Logo from "../../assets/react.svg";
import { HomeNavigate } from "../navigate/homeNavigate";

export function TopHomeDownButton() {
  return (
    <Popover>
      <PopoverButton
        className={clsx(
          "flex flex-row py-2.5 px-2.5 hover:bg-hover-background cursor-pointer items-center gap-1",
        )}
      >
        <img src={Logo} alt="logo" width={24} height={24} />
        <HiChevronDown size={12} />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom end", padding: "8px" }}
        className="flex flex-col w-75 py-2 bg-second-background shadow-lg"
      >
        <HomeNavigate />
      </PopoverPanel>
    </Popover>
  );
}
