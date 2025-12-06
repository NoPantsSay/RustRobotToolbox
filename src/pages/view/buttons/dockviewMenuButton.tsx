import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import type { IDockviewPanelHeaderProps } from "dockview-react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { eventBus } from "../../../utils/eventBus";

export function DockviewMenuButton({
  props,
  maximized,
}: {
  props: IDockviewPanelHeaderProps;
  maximized: boolean;
}) {
  return (
    <Menu>
      <MenuButton className="hover:bg-hover-background p-2 cursor-pointer">
        <IoEllipsisVerticalSharp size={16} />
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom start" }}
        className="flex flex-col py-1 bg-second-background z-10 shadow-lg outline-none"
      >
        <MenuItem>
          <Button className="flex flex-row py-1.5 px-4 items-center  data-focus:bg-hover-background cursor-pointer">
            <span className="text-sm">Change plane</span>
          </Button>
        </MenuItem>
        <MenuItem>
          <hr className="border-t-0 border-b border-b-border my-2 mx-4" />
        </MenuItem>
        <MenuItem>
          <Button
            className="flex flex-row py-1.5 px-4 items-center  data-focus:bg-hover-background cursor-pointer"
            onClick={() => {
              eventBus.emit("addpanel", {
                component: props.api.component,
                position: { referencePanel: props.api.id, direction: "right" },
              });
            }}
          >
            <span className="text-sm">Spilt right</span>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            className="flex flex-row py-1.5 px-4 items-center  data-focus:bg-hover-background cursor-pointer"
            onClick={() => {
              eventBus.emit("addpanel", {
                component: props.api.component,
                position: { referencePanel: props.api.id, direction: "below" },
              });
            }}
          >
            <span className="text-sm">Spilt down</span>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            className="flex flex-row py-1.5 px-4 items-center  data-focus:bg-hover-background cursor-pointer"
            onClick={() => {
              if (maximized) {
                props.api.exitMaximized();
              } else {
                props.api.maximize();
              }
            }}
          >
            {maximized ? (
              <span className="text-sm">Collapse</span>
            ) : (
              <span className="text-sm">Expand</span>
            )}
          </Button>
        </MenuItem>
        <MenuItem>
          <hr className="border-t-0 border-b border-b-border my-2 mx-4" />
        </MenuItem>
        <MenuItem>
          <Button
            className="flex flex-row py-1.5 px-4 items-center text-red-500  data-focus:bg-hover-background cursor-pointer"
            onClick={() => {
              props.api.close();
            }}
          >
            <span className="text-sm">Remove panel</span>
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
