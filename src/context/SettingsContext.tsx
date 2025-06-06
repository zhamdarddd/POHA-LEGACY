import { createContext, useState, ReactNode } from "react";

export const SettingsContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((d) => !d);
  }

  return (
    <SettingsContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
}
