import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTitle } from "../../../globals/useTitle";

export function Dashboard() {
  const setTitle = useTitle((state) => state.setTitle);
  const intl = useIntl();
  useEffect(() => {
    setTitle(intl.formatMessage({ id: "home.dashboard" }));
  }, [setTitle, intl]);

  return <div>Dashboard Page</div>;
}
