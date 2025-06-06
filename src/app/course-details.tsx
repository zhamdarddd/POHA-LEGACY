import { useLocalSearchParams } from "expo-router";
import { View, Text, Button, Alert } from "react-native";
import { useCourses } from "../hooks/useCourses";
import ProgressBar from "../components/ProgressBar";
import Quiz, { QuizQuestion } from "../components/Quiz";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const sampleQuiz: QuizQuestion[] = [
  {
    question: "What is React Native?",
    options: ["Web framework", "Mobile framework", "Database", "Video player"],
    answer: 1,
  },
  {
    question: "Which Expo command starts the project?",
    options: ["expo build", "expo start", "npm run", "expo test"],
    answer: 1,
  },
];

export default function CourseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { courses } = useCourses();
  const { colors } = useTheme();
  const [progress, setProgress] = useState(0.5); // Example progress
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const course = courses.find((c) => c.id === id);

  if (!course)
    return <Text style={{ color: colors.text }}>Course not found</Text>;

  const handleDownload = () => {
    Alert.alert("Download", "Course download started (stub).");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontWeight: "bold", fontSize: 24, color: colors.text }}>
        {course.title}
      </Text>
      <ProgressBar progress={progress} />
      <Text style={{ marginVertical: 8, color: colors.text }}>
        {course.description}
      </Text>
      <Button
        title="Download"
        color={colors.primary}
        onPress={handleDownload}
      />
      {!quizComplete && (
        <Button
          title="Take Quiz"
          color={colors.primary}
          onPress={() => setShowQuiz(true)}
        />
      )}
      {showQuiz && !quizComplete && (
        <Quiz
          questions={sampleQuiz}
          onComplete={() => {
            setQuizComplete(true);
            setShowQuiz(false);
          }}
        />
      )}
      {quizComplete && (
        <Text style={{ color: colors.text }}>Quiz Completed!</Text>
      )}
    </View>
  );
}
