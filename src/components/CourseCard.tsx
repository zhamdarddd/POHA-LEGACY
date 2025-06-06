import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { Course } from "../types";
import { useTheme } from "../context/ThemeContext";

export default function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View
      style={{
        margin: 12,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18, color: colors.text }}>
        {course.title}
      </Text>
      <Text style={{ color: colors.text }}>{course.description}</Text>
      <Button
        title="View Details"
        color={colors.primary}
        onPress={() => router.push(`/course-details?id=${course.id}`)}
      />
    </View>
  );
}
