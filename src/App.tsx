import "./styles/globals.css";
import { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDarkMode } from "react-theme-detector";
import { TopBar } from "./components/topbar/topBar";
import { Dashboard } from "./pages/home/dashboard/dashboard";
import { Devices } from "./pages/home/devices/devices";
import { Events } from "./pages/home/events/events";
import { Home } from "./pages/home/home";
import { Layouts } from "./pages/home/layouts/layouts";
import { Recordings } from "./pages/home/recordings/recordings";
import { Timeline } from "./pages/home/timeline/timeline";
import { Desktop } from "./pages/settings/desktop/desktop";
import { Extensions } from "./pages/settings/extensions/extensions";
import { General } from "./pages/settings/general/general";
import { Settings } from "./pages/settings/settings";
import { View } from "./pages/view/view";
import { useLanguage } from "./stores/useLanguage";
import { ThemeType, useTheme } from "./stores/useTheme";

function App() {
  const theme = useTheme((state) => state.theme);
  const isDarkMode = useDarkMode();
  const { language, getMessage } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === ThemeType.DARK || (theme === ThemeType.SYSTEM && isDarkMode),
    );
  }, [theme, isDarkMode]);

  return (
    <IntlProvider locale={language} messages={getMessage()}>
      <main className="h-screen w-screen grid grid-rows-[auto_1fr] grid-cols-1">
        <TopBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="devices" element={<Devices />} />
            <Route path="recordings" element={<Recordings />} />
            <Route path="events" element={<Events />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="layouts" element={<Layouts />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<General />} />
            <Route path="extensions" element={<Extensions />} />
            <Route path="desktop" element={<Desktop />} />
          </Route>

          <Route path="/view" element={<View />} />
        </Routes>
      </main>
    </IntlProvider>
  );
}

export default App;
