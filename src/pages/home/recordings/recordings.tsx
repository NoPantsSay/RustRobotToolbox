import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTitle } from "../../../globals/useTitle";

export function Recordings() {
  const setTitle = useTitle((state) => state.setTitle);
  const intl = useIntl();
  useEffect(() => {
    setTitle(intl.formatMessage({ id: "home.recordings" }));
  }, [setTitle, intl]);

  return <div>Recordings Page</div>;
}
