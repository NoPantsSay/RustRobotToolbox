import {
  Field,
  Fieldset,
  Label,
  Legend,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";
import { useMemo } from "react";
import { BsLaptopFill } from "react-icons/bs";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "react-tooltip";
import { UpDownIcon } from "../../../components/icons/upDownIcon";
import { useLanguage } from "../../../stores/useLanguage";
import { ThemeType, useTheme } from "../../../stores/useTheme";
import {
  timeFormats,
  timeFormatsMap,
  useTimeZoneStore,
} from "../../../stores/useTimeZoneStore";

const themes = [
  {
    display: "setting.theme.dark",
    theme: ThemeType.DARK,
    icon: HiMiniMoon,
  },
  {
    display: "setting.theme.light",
    theme: ThemeType.LIGHT,
    icon: HiMiniSun,
  },
  {
    display: "setting.theme.follow_system",
    theme: ThemeType.SYSTEM,
    icon: BsLaptopFill,
  },
] as const;

export const languages = [
  {
    name: "zh",
    display: "中文",
  },
  {
    name: "en",
    display: "English",
  },
] as const;

export function General() {
  const { theme, setTheme } = useTheme();
  const { timeZone, timeFormat, setTimeFormat } = useTimeZoneStore();
  const { language, setLanguage } = useLanguage();

  const date = useMemo(() => new Date(), []);

  return (
    <div className="p-6">
      {
        // 外观
      }
      <Fieldset className="grid grid-flow-row auto-rows-auto border border-border">
        <Legend className="text-xl p-4 border-b border-b-border">
          <FormattedMessage id={"setting.appearance"} />
        </Legend>
        <div className="grid grid-flow-row auto-rows-auto p-4">
          {
            // 主题颜色
          }
          <Field className="flex flex-col overflow-x-auto">
            <div className="mb-1 py-1">
              <Label className="text-xs text-description">
                <FormattedMessage id={"setting.color_scheme"} />
              </Label>
            </div>
            <RadioGroup
              value={theme}
              onChange={setTheme}
              className="flex flex-row whitespace-nowrap"
            >
              {themes.map((data) => (
                <Radio
                  key={data.theme}
                  value={data.theme}
                  className={({ checked }) =>
                    clsx(
                      "flex flex-row min-h-8 py-1 px-4 gap-2 border border-border items-center text-xs cursor-pointer",
                      checked
                        ? "text-scheme bg-scheme-background hover:bg-scheme-hover-background"
                        : "hover:bg-hover-background",
                    )
                  }
                >
                  <data.icon size={20} />
                  <FormattedMessage id={data.display} />
                </Radio>
              ))}
            </RadioGroup>
          </Field>
          {
            // 时间戳格式
          }
          <Field className="flex flex-col mt-4">
            <div className="mb-1 py-1">
              <Label className="text-xs text-description">
                <FormattedMessage id={"setting.timestamp_format"} />
              </Label>
            </div>
            <Listbox value={timeFormat} onChange={setTimeFormat}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 pl-2.5 pr-8 border border-border hover:border-foreground focus:border-scheme data-open:border-scheme outline-none cursor-pointer text-left text-base/4",
                )}
              >
                {({ open }) => {
                  return (
                    <>
                      {timeFormatsMap.get(timeFormat)?.format(date, timeZone)}
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
                {timeFormats.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 cursor-pointer hover:bg-hover-background data-focus:bg-hover-background data-selected:bg-scheme-background data-selected:hover:bg-scheme-hover-background data-selected:data-focus:bg-scheme-hover-background",
                    )}
                  >
                    <div
                      data-tooltip-id={data.name}
                      data-tooltip-content={data.name}
                    >
                      <Label className=" text-base pointer-events-none">
                        {data.format(date, timeZone)}
                      </Label>
                    </div>

                    <Tooltip
                      id={data.name}
                      place="left"
                      positionStrategy="fixed"
                      style={{
                        backgroundColor: `var(--color-background)`,
                        color: `var(--color-foreground)`,
                      }}
                    />
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
          {
            // 语言
          }
          <Field className="flex flex-col mt-4">
            <div className="mb-1 py-1">
              <Label className="text-xs text-description">
                <FormattedMessage id={"setting.language"} />
              </Label>
            </div>
            <Listbox value={language} onChange={setLanguage}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 pl-2.5 pr-8 cursor-pointer border border-border hover:border-foreground focus:border-scheme data-open:border-scheme outline-none text-left text-base/4",
                )}
              >
                {({ open }) => {
                  return (
                    <>
                      {
                        languages.find((data) => data.name === language)
                          ?.display
                      }
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
                {languages.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 cursor-pointer hover:bg-hover-background data-focus:bg-hover-background data-selected:bg-scheme-background data-selected:hover:bg-scheme-hover-background data-selected:data-focus:bg-scheme-hover-background",
                    )}
                  >
                    <Label className=" text-base pointer-events-none">
                      {data.display}
                    </Label>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
        </div>
      </Fieldset>
    </div>
  );
}
