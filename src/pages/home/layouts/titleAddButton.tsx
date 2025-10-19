import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { downloadDir } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiDownload } from "react-icons/pi";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { useLayouts } from "../../../stores/useLayouts";
import { AddLayoutDialog } from "./addLayoutDialog";

export function TitleAddButton() {
  const [isNewLayoutOpen, setIsNewLayoutOpen] = useState(false);

  const { loadDataFromJSON } = useLayouts();

  const importOnClick = async () => {
    const downloadsDir = await downloadDir();
    const path = await open({
      defaultPath: downloadsDir,
      filters: [
        {
          name: "json",
          extensions: ["json"],
        },
      ],
    });
    // console.log(path);
    if (path) {
      const str = await readTextFile(path);
      loadDataFromJSON(str);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton className="flex flex-row items-center px-2.25 py-0.75 border focus:not-data-focus:outline-none cursor-pointer">
          <FaPlus size={16} />
          <span className="pl-2 text-xs">Add</span>
        </MenuButton>

        <MenuItems
          anchor={{ to: "bottom end", gap: "-24px" }}
          className="flex flex-col py-1 bg-second-background shadow-lg outline-none"
        >
          <MenuItem>
            <Button
              onClick={() => {
                setIsNewLayoutOpen(true);
              }}
              className="flex flex-row py-1 px-3 items-center data-focus:bg-hover-background cursor-pointer"
            >
              <RiLayoutMasonryLine size={20} />
              <span className="pl-3 text-sm">New layout</span>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={() => {
                void importOnClick();
              }}
              className="flex flex-row py-1 px-3 items-center data-focus:bg-hover-background cursor-pointer"
            >
              <PiDownload size={20} />
              <span className="pl-3 text-sm">Import layout</span>
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
      {isNewLayoutOpen && (
        <AddLayoutDialog
          open={isNewLayoutOpen}
          onClose={() => {
            setIsNewLayoutOpen(false);
          }}
        />
      )}
    </>
  );
}
