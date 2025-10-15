import { IoSettingsOutline } from "react-icons/io5";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { HomeNavButton } from "../../../components/buttons/homeNavButton";

export function Setting() {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <HomeNavButton
      onClick={() => {
        navigate("/settings");
      }}
      label={intl.formatMessage({ id: "setting.settings" })}
      Icon={IoSettingsOutline}
    />
  );
}
