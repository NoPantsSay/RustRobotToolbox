import { Button } from "@headlessui/react";
import { MdClose } from "react-icons/md";

export function DockviewCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className="hover:bg-hover-background p-2 cursor-pointer"
      onClick={onClick}
    >
      <MdClose size={16} />
    </Button>
  );
}
