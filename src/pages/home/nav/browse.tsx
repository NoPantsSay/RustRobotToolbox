import {
  HiOutlineBars3,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineStopCircle,
} from "react-icons/hi2";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeNavButton } from "../../../components/buttons/homeNavButton";
import { useLanguage } from "../../../stores/useLanguage";

export function Browse() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const intl = useIntl();
  const { language } = useLanguage();

  return (
    <>
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
      <HomeNavButton
        onClick={() => {
          navigate("/home/layouts");
        }}
        label={intl.formatMessage({ id: "home.layouts" })}
        Icon={RiLayoutMasonryLine}
        isActive={currentPath === "/home/layouts"}
      />
    </>
  );
}
