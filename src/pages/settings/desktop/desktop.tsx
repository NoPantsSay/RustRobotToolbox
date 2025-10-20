import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useTitle } from "../../../globals/useTitle";

export function Desktop() {
  const setTitle = useTitle((state) => state.setTitle);
  const intl = useIntl();
  useEffect(() => {
    setTitle(intl.formatMessage({ id: "setting.settings" }));
  }, [setTitle, intl]);

  return <div>Desktop Settings Page</div>;
}
