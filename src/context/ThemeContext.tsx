import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

const lightColors = {
  background: "#fff",
  text: "#222",
  card: "#f4f4f4",
  primary: "#0066cc",
  border: "#e0e0e0",
  error: "#e63946",
  placeholder: "#888",
  inputBg: "#f4f4f4",
  icon: "#333",
};
const darkColors = {
  background: "#181818",
  text: "#fff",
  card: "#232323",
  primary: "#4ea8de",
  border: "#333",
  error: "#e63946",
  placeholder: "#bbb",
  inputBg: "#232323",
  icon: "#fff",
};
type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  colors: typeof lightColors;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const value = useMemo(
    () => ({
      theme,
      colors: theme === "dark" ? darkColors : lightColors,
      toggleTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
