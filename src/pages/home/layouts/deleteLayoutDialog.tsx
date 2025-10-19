import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { clsx } from "clsx";
import { useHotkeys } from "react-hotkeys-hook";

export function DeleteLayoutDialog({
  open,
  onClose,
  title,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  onDelete: () => void;
}) {
  useHotkeys("enter", () => {
    onDelete();
    onClose();
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-10 outline-none"
    >
      <div className="fixed inset-0 z-10 flex items-center justify-center p-12">
        <DialogPanel className="flex-1 max-w-md rounded-md bg-dialog-background drop-shadow-xl overflow-y-auto">
          <DialogTitle className="px-6 py-4 font-bold text-xl">
            {title}
          </DialogTitle>
          <div className="px-6 pb-5 text-sm">This action cannot be undone.</div>
          <div className="flex px-6 pb-6 gap-4 justify-end">
            <Button
              onClick={onClose}
              className={
                "outline-none text-sm items-center py-1 px-4 cursor-pointer border border-foreground hover:bg-hover-background"
              }
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className={clsx(
                "outline-none text-sm items-center py-1 px-4 cursor-pointer bg-red-500 hover:bg-red-500/50",
              )}
            >
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
