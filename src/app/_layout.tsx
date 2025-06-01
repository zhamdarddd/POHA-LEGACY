import { MyCoursesProvider } from "@/src/context/MyCoursesContext";
import { UserProfileProvider } from "@/src/context/UserProfileContext";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <UserProfileProvider>
      <MyCoursesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </MyCoursesProvider>
    </UserProfileProvider>
  );
}
