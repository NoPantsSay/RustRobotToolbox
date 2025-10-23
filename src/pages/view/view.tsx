import { useEffect } from "react";
import { useTitle } from "../../globals/useTitle";

export function View() {
  const setTitle = useTitle((state) => state.setTitle);
  useEffect(() => {
    setTitle("view");
  }, [setTitle]);

  return <div>View Page</div>;
}
