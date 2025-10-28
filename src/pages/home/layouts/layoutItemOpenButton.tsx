import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useLayouts } from "../../../stores/useLayouts";

export function LayoutItemOpenButton({ uuid }: { uuid: string }) {
  const navigate = useNavigate();

  const { updateLayout, pushRecentLayout } = useLayouts();

  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
        navigate("/view");
        updateLayout(uuid, { lastOpened: new Date() });
        pushRecentLayout(uuid);
      }}
      className={clsx(
        "outline-none border items-center cursor-pointer",
        "hidden group-hover:block text-scheme/50 hover:text-scheme",
      )}
    >
      <span className="text-xs px-4">
        <FormattedMessage id={"common.open"} />
      </span>
    </Button>
  );
}
