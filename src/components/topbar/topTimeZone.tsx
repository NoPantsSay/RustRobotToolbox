import {
  Button,
  Input,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { enUS } from "date-fns/locale/en-US";
import { formatInTimeZone } from "date-fns-tz";
import { useMemo, useRef, useState } from "react";
import { SlGlobe } from "react-icons/sl";
import {
  detectedTimeZone,
  useTimeZoneStore,
} from "../../stores/useTimeZoneStore";

const timeZones = Intl.supportedValuesOf("timeZone").filter(
  (tz) => tz !== "UTC",
);

function getGMT(timeZone: string): string {
  return formatInTimeZone(new Date(), timeZone, "OOOO", {
    locale: enUS,
  });
}

function getGMTShort(timeZone: string): string {
  return formatInTimeZone(new Date(), timeZone, "zzz", {
    locale: enUS,
  });
}

function TimeZonePanel({ close }: { close: () => void }) {
  const parentRef = useRef(null);
  const [query, setQuery] = useState("");
  const { timeZone, setTimeZone, setIsDetected } = useTimeZoneStore();

  const filteredTimeZone = useMemo(() => {
    if (query === "") {
      return [
        {
          type: "item",
          tz: detectedTimeZone,
          isDetected: true,
        },
        { type: "item", tz: "UTC", isDetected: false },
        { type: "separator", tz: "", isDetected: false },
        ...timeZones.map((tz) => ({ type: "item", tz, isDetected: false })),
      ];
    } else {
      const result: { type: string; tz: string; isDetected: boolean }[] = [];

      if (detectedTimeZone.toLowerCase().includes(query.toLowerCase())) {
        result.push({
          type: "item",
          tz: detectedTimeZone,
          isDetected: true,
        });
      }
      if ("UTC".toLowerCase().includes(query.toLowerCase())) {
        result.push({ type: "item", tz: "UTC", isDetected: false });
      }
      result.push(
        ...timeZones
          .filter((data) => {
            return data.toLowerCase().includes(query.toLowerCase());
          })
          .map((tz) => ({ type: "item", tz, isDetected: false })),
      );

      if (result.length === 0) {
        result.push({
          type: "none",
          tz: "",
          isDetected: false,
        });
      }

      return result;
    }
  }, [query]);

  const rowVirtualizer = useVirtualizer({
    count: filteredTimeZone.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const { type } = filteredTimeZone[index];
      return type === "separator" ? 17 : 32;
    },
    overscan: 5,
  });

  return (
    <div className="w-95">
      <div className="w-full p-1.5">
        <Input
          autoFocus
          className="w-full py-1.5 px-2 text-xs/4.5 outline-none bg-input-background"
          placeholder={`current:${timeZone}`}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          value={query}
        />
      </div>
      <div ref={parentRef} className="w-full min-h-8 max-h-80 overflow-y-auto">
        <div
          className={`relative w-full`}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const { type, tz, isDetected } =
              filteredTimeZone[virtualItem.index];

            if (type === "separator") {
              return (
                <div
                  key={virtualItem.key}
                  className={clsx(
                    `absolute top-0 left-0 w-full`,
                    "w-full px-4 py-2",
                  )}
                  style={{ transform: `translateY(${virtualItem.start}px)` }}
                >
                  <hr className="w-full border-border" />
                </div>
              );
            } else if (type === "none") {
              return (
                <div
                  key={virtualItem.key}
                  className={clsx(
                    "absolute top-0 left-0 h-8 w-full",
                    " items-center px-4 py-1.5 text-xs/5 text-description",
                  )}
                  style={{ transform: `translateY(${virtualItem.start}px)` }}
                >
                  <span>No options</span>
                </div>
              );
            } else {
              return (
                <Button
                  key={virtualItem.key}
                  className={clsx(
                    "absolute top-0 left-0 h-8 w-full",
                    "flex cursor-pointer justify-between items-center px-4 py-1.5 text-xs/5",
                    tz === timeZone
                      ? "bg-scheme-background hover:bg-scheme-hover-background"
                      : "hover:bg-hover-background",
                  )}
                  style={{ transform: `translateY(${virtualItem.start}px)` }}
                  onClick={() => {
                    setTimeZone(tz);
                    setIsDetected(isDetected);
                    close();
                  }}
                >
                  <span>{isDetected ? `Detected:${tz}` : tz}</span>
                  <span>{getGMT(tz)}</span>
                </Button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export function TopTimeZone() {
  const { timeZone } = useTimeZoneStore();

  return (
    <Popover>
      <PopoverButton className="flex gap-2 px-3 py-2.5 items-center hover:bg-hover-background outline-none cursor-pointer">
        <SlGlobe size={20} />
        <span className="text-center text-xs/6">{getGMTShort(timeZone)}</span>
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom end", padding: "8px" }}
        className="flex flex-col bg-second-background shadow-lg z-10"
      >
        {({ close }) => {
          return <TimeZonePanel close={close} />;
        }}
      </PopoverPanel>
    </Popover>
  );
}
