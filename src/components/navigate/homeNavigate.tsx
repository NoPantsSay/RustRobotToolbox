import {
  HiLink,
  HiOutlineBars3,
  HiOutlineBookmark,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineStopCircle,
} from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../stores/useLanguage";
import { HomeNavButton } from "../buttons/homeNavButton";

export function HomeNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const intl = useIntl();
  const { language } = useLanguage();

  const handleOpenFile = () => {
    alert("open file");
  };

  const handleOpenConnect = () => {
    alert("open connect");
  };
  return (
    <div className="flex flex-col text-xs">
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
      <hr className="mx-4 my-2 border-border" />
      <div className="px-4 leading-8">
        <span className="text-description">
          {intl
            .formatMessage({ id: "home.browse" })
            .toLocaleUpperCase(language)}
        </span>
      </div>
      <HomeNavButton
        onClick={() => {
          navigate("/home/dashboard");
        }}
        label={intl.formatMessage({ id: "home.dashboard" })}
        Icon={HiOutlineHome}
        isActive={currentPath === "/home/dashboard"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/home/devices");
        }}
        label={intl.formatMessage({ id: "home.devices" })}
        Icon={HiOutlineSquares2X2}
        isActive={currentPath === "/home/devices"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/home/recordings");
        }}
        label={intl.formatMessage({ id: "home.recordings" })}
        Icon={HiOutlineStopCircle}
        isActive={currentPath === "/home/recordings"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/home/events");
        }}
        label={intl.formatMessage({ id: "home.events" })}
        Icon={HiOutlineBookmark}
        isActive={currentPath === "/home/events"}
      />
      <HomeNavButton
        onClick={() => {
          navigate("/home/timeline");
        }}
        label={intl.formatMessage({ id: "home.timeline" })}
        Icon={HiOutlineBars3}
        isActive={currentPath === "/home/timeline"}
      />
      <hr className="mx-4 my-2 border-border" />
      <HomeNavButton
        onClick={() => {
          navigate("/home/layouts");
        }}
        label={intl.formatMessage({ id: "home.layouts" })}
        Icon={RiLayoutMasonryLine}
        isActive={currentPath === "/home/layouts"}
      />
      <hr className="mx-4 my-2 border-border" />
      <HomeNavButton
        onClick={() => {
          navigate("/settings");
        }}
        label={intl.formatMessage({ id: "setting.settings" })}
        Icon={IoSettingsOutline}
      />
    </div>
  );
}
