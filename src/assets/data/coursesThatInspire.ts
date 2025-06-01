export const coursesThatInspire = [
  {
    id: "22",
    imageUrl:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
    category: "Design",
    title: "Figma UI UX Design..",
    instructor: "Zahid Hamdard",
    rating: 4.2,
    enrolled: 2001,
    price: 115,
    progress: 0.65,

    oldPrice: 145,
    isBestSeller: true,
    isFavorite: false,
  },
  {
    id: "23",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    category: "Development",
    title: "React Native Bootcamp",
    instructor: "Sara Khan",
    rating: 4.8,
    enrolled: 3210,
    price: 129,
    progress: 0.65,

    oldPrice: 159,
    isBestSeller: true,
    isFavorite: false,
  },
  {
    id: "24",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    title: "Digital Marketing 101",
    instructor: "Ali Jawad",
    rating: 4.5,
    enrolled: 1874,
    progress: 0.65,

    price: 105,
    oldPrice: 130,
    isBestSeller: false,
    isFavorite: false,
  },
  {
    id: "25",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    category: "Photography",
    title: "Beginner Photography",
    instructor: "Omar Shafi",
    rating: 4.3,
    enrolled: 1420,
    price: 79,
    progress: 0.65,

    oldPrice: 99,
    isBestSeller: true,
    isFavorite: false,
  },
  {
    id: "26",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    category: "Writing",
    title: "Creative Writing Basics",
    instructor: "Fatima Noor",
    rating: 4.4,
    enrolled: 890,
    progress: 1,

    price: 59,
    oldPrice: 85,
    isBestSeller: false,
    isFavorite: false,
  },
];

// Fisher-Yates shuffle
export function getRandomizedCoursesThatInspire() {
  const arr = [...coursesThatInspire];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
