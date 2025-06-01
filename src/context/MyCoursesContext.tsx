import { Course } from "@/src/assets/data/types";
import React, { createContext, useContext, useState } from "react";

type MyCoursesContextType = {
  myCourses: Course[];
  addCourse: (course: Course) => void;
};

const MyCoursesContext = createContext<MyCoursesContextType>({
  myCourses: [],
  addCourse: () => {},
});

export const MyCoursesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setMyCourses((prev) => {
      if (prev.find((c) => c.id === course.id)) return prev;
      // Ensure added course is "Active"
      return [...prev, { ...course, progress: course.progress ?? 0.01 }];
    });
  };

  return (
    <MyCoursesContext.Provider value={{ myCourses, addCourse }}>
      {children}
    </MyCoursesContext.Provider>
  );
};

export const useMyCourses = () => useContext(MyCoursesContext);
