import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";
import { enableMapSet, produce } from "immer";
import SuperJSON from "superjson";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createSuperJSONStorage } from "./utils/superJsonStorage";

enableMapSet();

export enum LayoutTypeEnum {
  All = "all",
  Local = "local",
  Online = "Online",
}

interface LayoutTypeInfo {
  type: LayoutTypeEnum;
  display: string;
}

export const layoutTypes: LayoutTypeInfo[] = [
  {
    type: LayoutTypeEnum.All,
    display: "All",
  },
  {
    type: LayoutTypeEnum.Local,
    display: "Local",
  },
  {
    type: LayoutTypeEnum.Online,
    display: "Online",
  },
];

const layoutTypesMap = new Map(layoutTypes.map((data) => [data.type, data]));

export enum LayoutUpdateFilterEnum {
  All = "all",
  Today = "today",
  Yesterday = "yesterday",
  Last7Days = "last7Days",
  Last30Days = "last30Days",
  ThisMonth = "thisMonth",
  LastMonth = "lastMonth",
  ThisYear = "thisYear",
}

interface LayoutUpdateFilterInfo {
  type: LayoutUpdateFilterEnum;
  display: string;
  filter: (laterDate: Date, earlierDate: Date) => boolean;
}

export const layoutUpdateFilters: LayoutUpdateFilterInfo[] = [
  {
    type: LayoutUpdateFilterEnum.All,
    display: "All time",
    filter: (_laterDate: Date, _earlierDate: Date) => {
      return true;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Today,
    display: "Today",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 0;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Yesterday,
    display: "Yesterday",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 1;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Last7Days,
    display: "Last 7 Days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 7;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Last30Days,
    display: "Last 30 Days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 30;
    },
  },
  {
    type: LayoutUpdateFilterEnum.ThisMonth,
    display: "This month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 0;
    },
  },
  {
    type: LayoutUpdateFilterEnum.LastMonth,
    display: "Last month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 1;
    },
  },
  {
    type: LayoutUpdateFilterEnum.ThisYear,
    display: "This year",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarYears(laterDate, earlierDate) === 0;
    },
  },
];

const layoutUpdateFiltersMap = new Map(
  layoutUpdateFilters.map((data) => [data.type, data]),
);

export interface LayoutsInfo {
  name: string;
  type: LayoutTypeEnum;
  lastUpdated: Date;
  lastOpened?: Date;
}

interface LayoutsState {
  layouts: Map<string, LayoutsInfo>;
  immerAddLayout: (name: string, type: LayoutTypeEnum) => void;
  immerDelLayout: (uuid: string) => void;
  immerUpdateLayout: (uuid: string, updates: Partial<LayoutsInfo>) => void;
  immerDuplicateLayout: (uuid: string) => void;
  getSnapshotAsJSON: (uuid: string) => string;
  loadDataFromJSON: (jsonString: string) => boolean;
  getLayoutTypeDisplay: (type: LayoutTypeEnum) => string;
  getlayoutUpdateFilterDisplay: (type: LayoutUpdateFilterEnum) => string;
  getlayoutUpdateFilterFilter: (
    type: LayoutUpdateFilterEnum,
  ) => (laterDate: Date, earlierDate: Date) => boolean;
}

export const useLayouts = create<LayoutsState>()(
  persist(
    (set, get) => ({
      layouts: new Map(),
      immerAddLayout: (name: string, type: LayoutTypeEnum) => {
        set(
          produce((state: LayoutsState) => {
            state.layouts.set(uuidv4(), {
              name,
              type,
              lastUpdated: new Date(),
            });
          }),
        );
      },
      immerDelLayout: (uuid: string) => {
        set(
          produce((state: LayoutsState) => {
            state.layouts.delete(uuid);
          }),
        );
      },
      immerUpdateLayout: (uuid: string, updates: Partial<LayoutsInfo>) => {
        set(
          produce((state: LayoutsState) => {
            const layout = state.layouts.get(uuid);
            if (layout) {
              state.layouts.set(uuid, {
                ...layout,
                ...updates,
                lastUpdated: new Date(),
              });
            }
          }),
        );
      },
      immerDuplicateLayout: (uuid: string) => {
        set(
          produce((state: LayoutsState) => {
            const layout = state.layouts.get(uuid);
            if (layout) {
              state.layouts.set(uuidv4(), {
                ...layout,
                name: `${layout.name} copy`,
                type: LayoutTypeEnum.Local,
                lastUpdated: new Date(),
                lastOpened: undefined,
              });
            }
          }),
        );
      },
      getSnapshotAsJSON: (uuid: string) => {
        const layout = get().layouts.get(uuid);
        return SuperJSON.stringify(layout);
      },
      loadDataFromJSON: (jsonString: string) => {
        let parsedLayout: LayoutsInfo | null = null;

        try {
          parsedLayout = SuperJSON.parse(jsonString);
        } catch (error) {
          console.error("Failed to parse imported state:", error);
        }

        if (parsedLayout) {
          set(
            produce((state: LayoutsState) => {
              state.layouts.set(uuidv4(), {
                ...parsedLayout,
                type: LayoutTypeEnum.Local,
                lastUpdated: new Date(),
                lastOpened: undefined,
              });
            }),
          );

          return true;
        }

        return false;
      },
      getLayoutTypeDisplay: (type: LayoutTypeEnum) => {
        const info = layoutTypesMap.get(type);
        return info ? info.display : layoutTypes[0].display;
      },
      getlayoutUpdateFilterDisplay: (type: LayoutUpdateFilterEnum) => {
        const info = layoutUpdateFiltersMap.get(type);
        return info ? info.display : layoutUpdateFilters[0].display;
      },
      getlayoutUpdateFilterFilter: (type: LayoutUpdateFilterEnum) => {
        const info = layoutUpdateFiltersMap.get(type);
        return info ? info.filter : layoutUpdateFilters[0].filter;
      },
    }),
    {
      name: "layouts", // unique name
      storage: createSuperJSONStorage(() => localStorage),
    },
  ),
);
