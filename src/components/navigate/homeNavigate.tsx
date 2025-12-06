import { useHotkeys } from "react-hotkeys-hook";
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
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserHotkey } from "../../globals/useUserHotkey";
import { useLanguage } from "../../stores/useLanguage";
import { HomeNavButton } from "../buttons/homeNavButton";
import { TooltipWithPortal } from "../tooltips/tooltipWithPortal";
import { openConnect } from "../utils/openConnect";
import { openFile } from "../utils/openFile";

export function HomeNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const intl = useIntl();
  const { language } = useLanguage();
  const tooltipId = "HomeNavigateTooltipId";
  const { openFileHotkey, openConnectHotkey } = useUserHotkey();

  useHotkeys(
    openFileHotkey,
    (e) => {
      e.preventDefault();
      openFile();
    },
    { enableOnFormTags: true },
  );

  useHotkeys(
    openConnectHotkey,
    (e) => {
      e.preventDefault();
      openConnect();
    },
    { enableOnFormTags: true },
  );

  return (
    <>
      <div className="flex flex-col text-xs">
        <div className="px-4 leading-8">
          <span className="text-description">
            {intl
              .formatMessage({ id: "home.open_data_sources" })
              .toLocaleUpperCase(language)}
          </span>
        </div>
        <HomeNavButton
          onClick={openFile}
          data-tooltip-id={tooltipId}
          data-tooltip-content={openFileHotkey}
          data-tooltip-place="right"
        >
          <HiOutlineFolder size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.open_local_files"} />
        </HomeNavButton>
        <HomeNavButton
          onClick={openConnect}
          data-tooltip-id={tooltipId}
          data-tooltip-content={openConnectHotkey}
          data-tooltip-place="right"
        >
          <HiLink size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.open_connection"} />
        </HomeNavButton>
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
          isActive={currentPath === "/home/dashboard"}
        >
          <HiOutlineHome size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.dashboard"} />
        </HomeNavButton>
        <HomeNavButton
          onClick={() => {
            navigate("/home/devices");
          }}
          isActive={currentPath === "/home/devices"}
        >
          <HiOutlineSquares2X2 size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.devices"} />
        </HomeNavButton>
        <HomeNavButton
          onClick={() => {
            navigate("/home/recordings");
          }}
          isActive={currentPath === "/home/recordings"}
        >
          <HiOutlineStopCircle size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.recordings"} />
        </HomeNavButton>
        <HomeNavButton
          onClick={() => {
            navigate("/home/events");
          }}
          isActive={currentPath === "/home/events"}
        >
          <HiOutlineBookmark size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.events"} />
        </HomeNavButton>
        <HomeNavButton
          onClick={() => {
            navigate("/home/timeline");
          }}
          isActive={currentPath === "/home/timeline"}
        >
          <HiOutlineBars3 size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.timeline"} />
        </HomeNavButton>
        <hr className="mx-4 my-2 border-border" />
        <HomeNavButton
          onClick={() => {
            navigate("/home/layouts");
          }}
          isActive={currentPath === "/home/layouts"}
        >
          <RiLayoutMasonryLine size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"home.layouts"} />
        </HomeNavButton>
        <hr className="mx-4 my-2 border-border" />
        <HomeNavButton
          onClick={() => {
            navigate("/settings");
          }}
          isActive={currentPath === "/settings"}
        >
          <IoSettingsOutline size={20} className="ml-2 text-scheme" />
          <FormattedMessage id={"setting.settings"} />
        </HomeNavButton>
      </div>
      <TooltipWithPortal id={tooltipId} />
    </>
  );
}
