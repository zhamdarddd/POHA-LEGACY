import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
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
      <Text style={{ fontSize: 24, color: colors.text }}>
        Welcome to POHA Legacy!
      </Text>
      <Text style={{ marginVertical: 12, color: colors.text }}>
        Role: {user?.role}
      </Text>
      <Button
        title="Browse Courses"
        color={colors.primary}
        onPress={() => router.push("/courses")}
      />
    </View>
  );
}
