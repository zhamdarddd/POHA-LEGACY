import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useTheme } from "../context/ThemeContext";

export default function UploadCourseScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addCourse } = useCourses();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: colors.background }}>
      <TextInput
        placeholder="Course Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 12,
          padding: 8,
          color: colors.text,
          backgroundColor: colors.card,
        }}
        placeholderTextColor={colors.text}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 12,
          padding: 8,
          color: colors.text,
          backgroundColor: colors.card,
        }}
        placeholderTextColor={colors.text}
      />
      <Button
        title="Upload Course"
        color={colors.primary}
        onPress={() => {
          if (title && description) addCourse({ title, description });
        }}
      />
    </View>
  );
}
