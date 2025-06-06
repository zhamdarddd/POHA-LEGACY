import { View, Text, Button } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ fontSize: 22, color: colors.text }}>
        {user?.name || "Guest"}
      </Text>
      <Text style={{ color: colors.text }}>{user?.email}</Text>
      <Text style={{ marginVertical: 10, color: colors.text }}>
        Role: {user?.role || "none"}
      </Text>
      <Button title="Logout" color={colors.primary} onPress={logout} />
    </View>
  );
}
