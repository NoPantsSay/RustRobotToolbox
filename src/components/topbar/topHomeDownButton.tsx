import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { useHotkeys } from "react-hotkeys-hook";
import { HiChevronDown } from "react-icons/hi2";
import Logo from "../../assets/react.svg";
import { useUserHotkey } from "../../globals/useUserHotkey";
import { TopHomeNavigate } from "../navigate/topHomeNavigate";
import { openConnect } from "../utils/openConnect";
import { openFile } from "../utils/openFile";

export function TopHomeDownButton() {
  const { openFileHotkey, openConnectHotkey } = useUserHotkey();

  useHotkeys(
    openFileHotkey,
    (e) => {
      e.preventDefault();
      openFile();
    },
    { enableOnFormTags: true },
  );

  useHotkeys(
    openConnectHotkey,
    (e) => {
      e.preventDefault();
      openConnect();
    },
    { enableOnFormTags: true },
  );

  return (
    <Popover>
      <PopoverButton
        className={clsx(
          "flex flex-row py-2.5 px-2.5 hover:bg-hover-background cursor-pointer items-center gap-1 outline-none",
        )}
      >
        <img src={Logo} alt="logo" width={24} height={24} />
        <HiChevronDown size={12} />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom end", padding: "8px" }}
        className="flex flex-col w-75 py-2 bg-second-background shadow-lg z-10"
      >
        <TopHomeNavigate />
      </PopoverPanel>
    </Popover>
  );
}
