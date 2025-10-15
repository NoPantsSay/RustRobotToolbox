import { clsx } from "clsx";
import { Outlet } from "react-router-dom";
import { Browse } from "./nav/browse";
import { OpenDataSources } from "./nav/openDataSources";
import { Setting } from "./nav/setting";

export function Home() {
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
        <OpenDataSources />
        <hr className="mx-4 my-2 border-border" />
        <Browse />
        <hr className="mx-4 my-2 border-border" />
        <Setting />
      </div>

      <Outlet />
    </div>
  );
}
