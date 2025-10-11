import "./styles/globals.css";
import { useEffect } from "react";
import { useDarkMode } from "react-theme-detector";
import { ThemeType, useTheme } from "./stores/useTheme";

function App() {
  const theme = useTheme((state) => state.theme);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === ThemeType.DARK || (theme === ThemeType.SYSTEM && isDarkMode),
    );
  }, [theme, isDarkMode]);

  return (
    <main className="">
      <h1>Welcome to Tauri + React</h1>
    </main>
  );
}

export default App;
