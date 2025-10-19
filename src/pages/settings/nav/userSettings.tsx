import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeNavButton } from "../../../components/buttons/homeNavButton";
import { useLanguage } from "../../../stores/useLanguage";

export function UserSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const intl = useIntl();
  const { language } = useLanguage();

  return (
    <>
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
    </>
  );
}
