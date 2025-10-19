import { Button } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa6";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export function ReturnDashboard() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/home/dashboard");
      }}
      className="w-full flex flex-row min-h-8 py-1 px-4 mb-2 gap-2 items-center text-scheme hover:bg-hover-background cursor-pointer"
    >
      <FaArrowLeft size={20} />
      <FormattedMessage id={"setting.back_to_dashboard"} />
    </Button>
  );
}
