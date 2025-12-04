import { useEffect, useState } from "react";
import { eventBus } from "../../../../utils/eventBus";

export function Panel() {
  const [activeMainPanelId, setActiveMainPanelId] = useState("");

  useEffect(() => {
    eventBus.on("setActiveMainPanelId", (id) => {
      setActiveMainPanelId(id);
    });

    // 组件卸载时自动清理（防止内存泄漏）
    return () => {
      eventBus.off("setActiveMainPanelId");
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">Panel Settings</h2>
      {activeMainPanelId !== "" && (
        <p>Active Main Panel ID: {activeMainPanelId}</p>
      )}
      {/* 在这里添加更多面板设置内容 */}
    </div>
  );
}
