import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ProgressBar({ progress }: { progress: number }) {
  const { colors } = useTheme();
  return (
    <View
      style={{ height: 8, backgroundColor: colors.border, borderRadius: 4 }}
    >
      <View
        style={{
          width: `${progress * 100}%`,
          height: 8,
          backgroundColor: colors.primary,
          borderRadius: 4,
        }}
      />
    </View>
  );
}
