import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext";
export function useCourses() {
  return useContext(CoursesContext);
}
