import { Button } from "@headlessui/react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

export function DockviewMenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button className="hover:bg-hover-background p-2" onClick={onClick}>
      <IoEllipsisVerticalSharp size={16} />
    </Button>
  );
}
