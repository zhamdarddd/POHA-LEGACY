import { Course } from "./types";

export const completedCourses: Course[] = [
  {
    id: "figma-ui-ux",
    title: "Figma UI UX Design",
    instructor: "Jane Cooper",
    imageUrl: "https://link-to-figma-image.com/figma.png",
    category: "Design",
    status: "Completed",
    progress: 1,
    isFavorite: true,
    isBestSeller: false,
    rating: 4.8,
    enrolled: 2300,
    price: 0, // or whatever price you want
    oldPrice: 0, // or previous price
  },
  // Add more completed course objects here, all with required fields
];
