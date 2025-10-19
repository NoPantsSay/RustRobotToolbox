import { clsx } from "clsx";
import { Outlet } from "react-router-dom";
import { ReturnDashboard } from "./nav/returnDashboard";
import { UserSettings } from "./nav/userSettings";

export function Settings() {
  return (
    <div
      className={clsx(
        "grid",
        "not-sm:grid-rows-[auto_auto] not-sm:grid-cols-1 not-sm:overflow-y-auto",
        "sm:grid-cols-[auto_1fr] sm:grid-rows-1 sm:overflow-hidden",
      )}
    >
      <div
        className={clsx(
          "block min-w-[280px] bg-second-background border-r border-border px-3 pt-5 pb-4 text-xs ",
          "not-sm:overflow-y-hide",
          "sm:overflow-y-auto",
        )}
      >
        <ReturnDashboard />
        <UserSettings />
      </div>

      <Outlet />
    </div>
  );
}
