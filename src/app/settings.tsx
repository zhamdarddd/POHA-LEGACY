import { View, Text, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ fontSize: 22, color: colors.text }}>Settings</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
      >
        <Text style={{ color: colors.text, marginRight: 8 }}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}
