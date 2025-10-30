import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { clsx } from "clsx";
import { useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { MdClose } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";
import { titleCase } from "title-case";
import {
  LayoutTypeEnum,
  layoutTypes,
  useLayouts,
} from "../../stores/useLayouts";
import { UpDownIcon } from "../icons/upDownIcon";

export function AddLayoutDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (uuid?: string) => void;
}) {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [layoutType, setLayoutType] = useState(LayoutTypeEnum.Local);
  const { getLayoutTypeDisplay, addLayout } = useLayouts();

  const filterLayoutTypes = useMemo(() => {
    return layoutTypes.filter((data) => {
      return data.type !== LayoutTypeEnum.All;
    });
  }, []);

  const onCreate = () => {
    const uuid = addLayout(name, layoutType);
    onClose(uuid);
  };

  useHotkeys("enter", onCreate, { enableOnFormTags: ["INPUT"] });

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      className="relative z-100 outline-none"
    >
      <div className="fixed inset-0 flex items-center justify-center p-12">
        <DialogPanel className="flex-1 max-w-md rounded-md bg-dialog-background drop-shadow-xl overflow-y-auto">
          <div className="flex flex-row border-b border-b-border justify-between items-center px-6 pt-4 pb-3">
            <DialogTitle className="font-bold text-xl">
              {titleCase(
                intl.formatMessage({ id: "layouts.create_new_layout" }),
              )}
            </DialogTitle>
            <Button
              onClick={() => {
                onClose();
              }}
              className="hover:bg-hover-background p-2"
            >
              <MdClose size={16} />
            </Button>
          </div>
          <Fieldset className="flex flex-col px-6 py-5 gap-2">
            <Field className="flex flex-col">
              <Label className="text-xs pt-1 pb-2">
                <FormattedMessage id={"common.name"} />
              </Label>
              <Input
                autoFocus={true}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder={intl.formatMessage({ id: "layouts.layout_name" })}
                className={clsx(
                  "py-2 px-2.5 text-sm border border-border hover:border-foreground focus:border-scheme outline-none",
                )}
              />
            </Field>
            <Field className="flex flex-col">
              <Label className="text-xs pt-1 pb-2">
                <FormattedMessage id={"common.type"} />
              </Label>
              <Listbox value={layoutType} onChange={setLayoutType}>
                <ListboxButton
                  disabled={true}
                  className={clsx(
                    "relative py-2 px-2.5 text-sm text-description focus:border-scheme data-open:border-scheme rounded-none outline-none text-left cursor-pointer",
                    "border border-border not-disabled:hover:border-foreground",
                    "disabled:bg-disable-background disabled:text-disable-foreground",
                  )}
                >
                  {({ open }) => {
                    return (
                      <>
                        <FormattedMessage
                          id={getLayoutTypeDisplay(layoutType)}
                        />
                        <UpDownIcon
                          open={open}
                          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-foreground"
                          aria-hidden="true"
                        />
                      </>
                    );
                  }}
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  className={clsx(
                    "w-(--button-width) py-2 bg-second-background outline-none",
                  )}
                >
                  {filterLayoutTypes.map((data) => (
                    <ListboxOption
                      key={data.type}
                      value={data.type}
                      className={clsx(
                        "py-1.5 px-4 cursor-pointer hover:bg-hover-background data-focus:bg-hover-background data-selected:bg-scheme-background data-selected:hover:bg-scheme-hover-background data-selected:data-focus:bg-scheme-hover-background",
                      )}
                    >
                      <Label className="text-sm pointer-events-none">
                        <FormattedMessage id={data.display} />
                      </Label>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </Field>
          </Fieldset>
          <div className="flex px-6 pb-6 gap-4 justify-end">
            <Button
              onClick={() => {
                onClose();
              }}
              className={
                "outline-none text-sm items-center py-1 px-4 cursor-pointer border border-foreground hover:bg-hover-background"
              }
            >
              <FormattedMessage id={"common.cancel"} />
            </Button>
            <Button
              disabled={name === ""}
              onClick={onCreate}
              className={clsx(
                "outline-none text-sm items-center py-1 px-4 cursor-pointer bg-scheme hover:bg-scheme/50",
                "disabled:bg-disable-background disabled:text-disable-foreground",
              )}
            >
              <FormattedMessage id={"common.create"} />
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
