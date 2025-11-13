import { Button } from "@headlessui/react";
import { MdClose } from "react-icons/md";

export function DockviewCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className="text-[#ddd] hover:bg-hover-background p-2"
      onClick={onClick}
    >
      <MdClose size={16} />
    </Button>
  );
}
