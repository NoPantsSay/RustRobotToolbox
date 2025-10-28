import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiDownload } from "react-icons/pi";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { FormattedMessage } from "react-intl";
import { AddLayoutDialog } from "../../../components/dialogs/addLayoutDialog";
import { importLayout } from "../../../components/utils/importLayout";
import { useLayouts } from "../../../stores/useLayouts";

export function TopAddButton() {
  const [isNewLayoutOpen, setIsNewLayoutOpen] = useState(false);

  const { loadDataFromJSON } = useLayouts();

  const handleImportLayout = async () => {
    const str = await importLayout();
    if (str) {
      loadDataFromJSON(str);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton className="flex flex-row items-center px-2.25 py-0.75 border focus:not-data-focus:outline-none cursor-pointer">
          <FaPlus size={16} />
          <span className="pl-2 text-xs">
            <FormattedMessage id={"common.add"} />
          </span>
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
              <span className="pl-3 text-sm">
                <FormattedMessage id={"layouts.new_layout"} />
              </span>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              onClick={() => {
                void handleImportLayout();
              }}
              className="flex flex-row py-1 px-3 items-center data-focus:bg-hover-background cursor-pointer"
            >
              <PiDownload size={20} />
              <span className="pl-3 text-sm">
                <FormattedMessage id={"layouts.import_layout"} />
              </span>
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
