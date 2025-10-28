import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function RenameLayoutDialog({
  open,
  onClose,
  originalName,
  onChangeName,
}: {
  open: boolean;
  onClose: () => void;
  originalName: string;
  onChangeName: (newName: string) => void;
}) {
  const [name, setName] = useState(originalName);

  useHotkeys(
    "enter",
    () => {
      onChangeName(name);
      onClose();
    },
    { enableOnFormTags: ["INPUT"] },
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-10 outline-none"
    >
      <div className="fixed inset-0 z-10 flex items-center justify-center p-12">
        <DialogPanel className="flex-1 max-w-md rounded-md bg-dialog-background drop-shadow-xl overflow-y-auto">
          <DialogTitle className="px-6 py-4 font-bold text-xl">
            Rename layout
          </DialogTitle>
          <div className="flex flex-col px-6 pb-5">
            <Input
              autoFocus={true}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Layout name"
              className={clsx(
                "py-2 px-2.5 text-sm border border-border hover:border-foreground focus:border-scheme outline-none",
              )}
            />
          </div>
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
                onChangeName(name);
                onClose();
              }}
              className={clsx(
                "outline-none text-sm items-center py-1 px-4 cursor-pointer bg-scheme hover:bg-scheme/50",
              )}
            >
              Rename
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
