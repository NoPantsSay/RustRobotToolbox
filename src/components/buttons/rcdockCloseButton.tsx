import { Button } from "@headlessui/react";
import { MdClose } from "react-icons/md";

export function RcdockCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className="text-[#ddd] hover:text-[#666] dark:text-[#444] dark:hover:text-white p-2"
      onClick={onClick}
    >
      <MdClose size={14} />
    </Button>
  );
}
