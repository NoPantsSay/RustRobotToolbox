import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTitle } from "../../../globals/useTitle";

export function Timeline() {
  const setTitle = useTitle((state) => state.setTitle);
  const intl = useIntl();
  useEffect(() => {
    setTitle(intl.formatMessage({ id: "home.timeline" }));
  }, [setTitle, intl]);

  return <div>Timeline Page</div>;
}
