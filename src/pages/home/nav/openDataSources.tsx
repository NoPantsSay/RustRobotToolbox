import { HiLink, HiOutlineFolder } from "react-icons/hi2";
import { useIntl } from "react-intl";
import { HomeNavButton } from "../../../components/buttons/homeNavButton";
import { useLanguage } from "../../../stores/useLanguage";

export function OpenDataSources() {
  const intl = useIntl();
  const { language } = useLanguage();

  const handleOpenFile = () => {
    alert("open file");
  };

  const handleOpenConnect = () => {
    alert("open connect");
  };

  return (
    <>
      <div className="px-4 leading-8">
        <span className="text-description">
          {intl
            .formatMessage({ id: "home.open_data_sources" })
            .toLocaleUpperCase(language)}
        </span>
      </div>
      <HomeNavButton
        onClick={handleOpenFile}
        hotkey="Ctrl+O"
        label={intl.formatMessage({ id: "home.open_local_files" })}
        Icon={HiOutlineFolder}
      />
      <HomeNavButton
        onClick={handleOpenConnect}
        hotkey="Ctrl+Shift+O"
        label={intl.formatMessage({ id: "home.open_connection" })}
        Icon={HiLink}
      />
    </>
  );
}
