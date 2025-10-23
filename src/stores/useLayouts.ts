import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";
import SuperJSON from "superjson";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSuperJSONStorage } from "./utils/superJsonStorage";

export enum LayoutTypeEnum {
  All = "all",
  Local = "local",
  Online = "online",
}

interface LayoutTypeInfo {
  type: LayoutTypeEnum;
  display: string;
}

export const layoutTypes: LayoutTypeInfo[] = [
  {
    type: LayoutTypeEnum.All,
    display: "layouts.types.all",
  },
  {
    type: LayoutTypeEnum.Local,
    display: "layouts.types.local",
  },
  {
    type: LayoutTypeEnum.Online,
    display: "layouts.types.online",
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
    display: "layouts.update_filters.all_time",
    filter: (_laterDate: Date, _earlierDate: Date) => {
      return true;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Today,
    display: "layouts.update_filters.today",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 0;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Yesterday,
    display: "layouts.update_filters.yesterday",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 1;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Last7Days,
    display: "layouts.update_filters.last_7_days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 7;
    },
  },
  {
    type: LayoutUpdateFilterEnum.Last30Days,
    display: "layouts.update_filters.last_30_days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 30;
    },
  },
  {
    type: LayoutUpdateFilterEnum.ThisMonth,
    display: "layouts.update_filters.this_month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 0;
    },
  },
  {
    type: LayoutUpdateFilterEnum.LastMonth,
    display: "layouts.update_filters.last_month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 1;
    },
  },
  {
    type: LayoutUpdateFilterEnum.ThisYear,
    display: "layouts.update_filters.this_year",
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
  AddLayout: (name: string, type: LayoutTypeEnum) => void;
  DelLayout: (uuid: string) => void;
  UpdateLayout: (uuid: string, updates: Partial<LayoutsInfo>) => void;
  DuplicateLayout: (uuid: string) => void;
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
    immer((set, get) => ({
      layouts: new Map(),
      AddLayout: (name: string, type: LayoutTypeEnum) => {
        set((state: LayoutsState) => {
          state.layouts.set(uuidv4(), {
            name,
            type,
            lastUpdated: new Date(),
          });
        });
      },
      DelLayout: (uuid: string) => {
        set((state: LayoutsState) => {
          state.layouts.delete(uuid);
        });
      },
      UpdateLayout: (uuid: string, updates: Partial<LayoutsInfo>) => {
        set((state: LayoutsState) => {
          const layout = state.layouts.get(uuid);
          if (layout) {
            state.layouts.set(uuid, {
              ...layout,
              ...updates,
            });
          }
        });
      },
      DuplicateLayout: (uuid: string) => {
        set((state: LayoutsState) => {
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
        });
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
          set((state: LayoutsState) => {
            state.layouts.set(uuidv4(), {
              ...parsedLayout,
              type: LayoutTypeEnum.Local,
              lastUpdated: new Date(),
              lastOpened: undefined,
            });
          });

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
    })),
    {
      name: "layouts", // unique name
      storage: createSuperJSONStorage(() => localStorage),
    },
  ),
);
