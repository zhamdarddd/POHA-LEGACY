import { createContext, useState, ReactNode } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
}
interface CoursesContextType {
  courses: Course[];
  addCourse: (course: { title: string; description: string }) => void;
}
export const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  addCourse: () => {},
});
export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "React Native Basics",
      description: "Learn the basics of RN.",
    },
    {
      id: "2",
      title: "Advanced Expo",
      description: "Deep dive into Expo features.",
    },
  ]);
  function addCourse(course: { title: string; description: string }) {
    setCourses((prev) => [
      ...prev,
      { ...course, id: (prev.length + 1).toString() },
    ]);
  }
  return (
    <CoursesContext.Provider value={{ courses, addCourse }}>
      {children}
    </CoursesContext.Provider>
  );
}
