import { useState } from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "../context/ThemeContext";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

export default function Quiz({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const { colors } = useTheme();

  if (step >= questions.length) {
    return (
      <View>
        <Text style={{ color: colors.text }}>
          Quiz complete! Your score: {score}/{questions.length}
        </Text>
        <Button
          title="Done"
          color={colors.primary}
          onPress={() => onComplete(score)}
        />
      </View>
    );
  }

  const q = questions[step];
  return (
    <View>
      <Text style={{ color: colors.text, marginBottom: 8 }}>{q.question}</Text>
      {q.options.map((opt, idx) => (
        <Button
          key={idx}
          title={opt}
          color={colors.primary}
          onPress={() => {
            if (idx === q.answer) setScore(score + 1);
            setStep(step + 1);
          }}
        />
      ))}
    </View>
  );
}
