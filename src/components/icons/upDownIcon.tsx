import type { IconBaseProps } from "react-icons";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

export function UpDownIcon(props: { open: boolean } & IconBaseProps) {
  const { open, ...restProps } = props;

  return open ? (
    <HiChevronUp {...restProps} />
  ) : (
    <HiChevronDown {...restProps} />
  );
}
