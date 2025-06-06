import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 16, color: colors.text }}>
        Login
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
        title="Login"
        color={colors.primary}
        onPress={() => login(email, password)}
      />
      <Button
        title="Register"
        color={colors.primary}
        onPress={() => router.push("/register")}
      />
    </View>
  );
}
