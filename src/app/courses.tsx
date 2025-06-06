import { View, FlatList, Text } from "react-native";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard";
import { useTheme } from "../context/ThemeContext";

export default function CoursesScreen() {
  const { courses } = useCourses();
  const { colors } = useTheme();
  if (!courses.length)
    return <Text style={{ color: colors.text }}>No courses found!</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
      />
    </View>
  );
}
