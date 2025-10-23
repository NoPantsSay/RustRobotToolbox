import { Button } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa6";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../stores/useLanguage";
import { HomeNavButton } from "../buttons/homeNavButton";

export function SettingsNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const intl = useIntl();
  const { language } = useLanguage();

  return (
    <div className="flex flex-col text-xs">
      <Button
        onClick={() => {
          navigate("/home/dashboard");
        }}
        className="w-full flex flex-row min-h-8 py-1 px-4 mb-2 gap-2 items-center text-scheme hover:bg-hover-background cursor-pointer"
      >
        <FaArrowLeft size={20} />
        <FormattedMessage id={"setting.back_to_dashboard"} />
      </Button>
      <div className="px-4 leading-7.5">
        <span className="text-description">
          {intl
            .formatMessage({ id: "setting.user_settings" })
            .toLocaleUpperCase(language)}
        </span>
      </div>
      <HomeNavButton
        onClick={() => {
          navigate("/settings/general");
        }}
        label={intl.formatMessage({ id: "setting.general" })}
        isActive={currentPath === "/settings/general"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/settings/extensions");
        }}
        label={intl.formatMessage({ id: "setting.extensions" })}
        isActive={currentPath === "/settings/extensions"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/settings/desktop");
        }}
        label={intl.formatMessage({ id: "setting.desktop" })}
        isActive={currentPath === "/settings/desktop"}
      />
    </div>
  );
}
