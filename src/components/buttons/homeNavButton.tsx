import { Button, type ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface HomeNavButtonProps extends ButtonProps {
  isActive?: boolean;
  children: React.ReactNode;
}

export function HomeNavButton(props: HomeNavButtonProps) {
  const { isActive, children, ...restProps } = props;

  return (
    <div>
      <Button
        className={clsx(
          "w-full flex flex-row min-h-8 px-4 pypx-4 py-1 gap-2-1 gap-2 items-center cursor-pointer",
          isActive
            ? "bg-scheme-background hover:bg-scheme-hover-background"
            : "hover:bg-hover-background ",
        )}
        {...restProps}
      >
        {children}
      </Button>
    </div>
  );
}
