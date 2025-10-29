import ReactDOM from "react-dom";
import { Tooltip } from "react-tooltip";

export function TooltipWithPortal({ id }: { id: string }) {
  return ReactDOM.createPortal(
    <Tooltip
      id={id}
      style={{
        fontSize: "12px",
        lineHeight: "1.333",
        backgroundColor: `var(--color-tooltip-background)`,
        color: `var(--color-tooltip-foreground)`,
        zIndex: 1000,
      }}
    />,
    document.body,
  );
}
