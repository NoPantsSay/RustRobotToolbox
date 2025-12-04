import { Button } from "@headlessui/react";
import { IoSettingsSharp } from "react-icons/io5";

export function DockviewSettingButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button className="hover:bg-hover-background p-2" onClick={onClick}>
      <IoSettingsSharp size={16} />
    </Button>
  );
}
