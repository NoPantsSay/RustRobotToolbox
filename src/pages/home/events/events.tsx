import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTitle } from "../../../globals/useTitle";

export function Events() {
  const setTitle = useTitle((state) => state.setTitle);
  const intl = useIntl();
  useEffect(() => {
    setTitle(intl.formatMessage({ id: "home.events" }));
  }, [setTitle, intl]);

  return <div>Events Page</div>;
}
