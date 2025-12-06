import { Button } from "@headlessui/react";
import { IoMdContract, IoMdExpand } from "react-icons/io";

export function DockviewExpandButton({
  isExpand,
  onClick,
}: {
  isExpand: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      className="hover:bg-hover-background p-2 cursor-pointer"
      onClick={onClick}
    >
      {isExpand ? <IoMdExpand size={16} /> : <IoMdContract size={16} />}
    </Button>
  );
}
