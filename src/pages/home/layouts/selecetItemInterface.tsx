import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import type { Updater } from "use-immer";

import { useLayouts } from "../../../stores/useLayouts";
import { DeleteLayoutDialog } from "./deleteLayoutDialog";

export function SelecetItemInterface({
  layoutsCheckedSet,
  setLayoutsCheckedSet,
}: {
  layoutsCheckedSet: Set<string>;
  setLayoutsCheckedSet: Updater<Set<string>>;
}) {
  const [isDeleteLayoutOpen, setIsDeleteLayoutOpen] = useState(false);
  const { immerDelLayout } = useLayouts();

  return (
    <>
      <div
        className={clsx(
          "absolute left-12.5 top-0.25 right-0 h-9.5 z-1 flex flex-row gap-3 items-center bg-data-grid-border",
        )}
      >
        <Button
          onClick={() => {
            setIsDeleteLayoutOpen(true);
          }}
          className="flex flex-row items-center border border-red-500/50 text-red-500 hover:border-red-500 hover:bg-hover-background py-1.5 pl-2 pr-3 gap-2 cursor-pointer"
        >
          <IoTrashOutline size={16} />
          <span className="text-xs">Delete</span>
        </Button>
        <span className="text-xs text-description">
          {layoutsCheckedSet.size} selected Layout
        </span>
      </div>
      {isDeleteLayoutOpen && (
        <DeleteLayoutDialog
          open={isDeleteLayoutOpen}
          onClose={() => {
            setIsDeleteLayoutOpen(false);
          }}
          title={`Delete ${layoutsCheckedSet.size} selected layouts?`}
          onDelete={() => {
            layoutsCheckedSet.forEach((uuid) => {
              immerDelLayout(uuid);
            });
            setLayoutsCheckedSet(new Set<string>());
          }}
        />
      )}
    </>
  );
}
