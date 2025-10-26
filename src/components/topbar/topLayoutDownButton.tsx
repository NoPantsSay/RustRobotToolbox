import {
  Button,
  Input,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import { RiLayoutMasonryLine } from "react-icons/ri";

function TopLayoutDownPanel({ close }: { close: () => void }) {
  return <div className="w-95"></div>;
}

export function TopLayoutDownButton() {
  return (
    <Popover>
      <PopoverButton className="flex flex-row gap-3 px-3 py-2.5 items-center hover:bg-hover-background outline-none cursor-pointer">
        <div className="flex flex-row gap-1 items-center">
          <RiLayoutMasonryLine size={20} />
          <span className="text-center text-xs/6">layout name</span>
        </div>
        <HiChevronDown size={12} />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom end", padding: "8px" }}
        className="flex flex-col bg-second-background shadow-lg"
      >
        {({ close }) => {
          return <TopLayoutDownPanel close={close} />;
        }}
      </PopoverPanel>
    </Popover>
  );
}
