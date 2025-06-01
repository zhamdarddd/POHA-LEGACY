import { FilterDropdown } from "@/src/components/FilterDropdown";
import SearchBar from "@/src/components/SearchBar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your courses data from assets/data
import { coursesThatInspire } from "@/src/assets/data/coursesThatInspire";
import { popularCourses } from "@/src/assets/data/popularCourses";
import { recommendedCourses } from "@/src/assets/data/recommendedCourses";

// -- Card import below --
import CourseListCard from "@/src/components/CourseListCard";

type Course = {
  id: string;
  title: string;
  imageUrl?: string;
  category: string;
  difficulty: string;
  language: string;
  isFree: boolean;
  instructor: string;
  description: string;
  rating?: number;
  enrolled?: number;
  price?: number;
  oldPrice?: number;
  isBestSeller?: boolean;
  isFavorite?: boolean;
};

// Helper to map data to Course type
function toCourse(data: any): Course {
  return {
    id: data.id,
    title: data.title,
    imageUrl: data.imageUrl,
    category: data.category ?? "development",
    difficulty: data.difficulty ?? "beginner",
    language: data.language ?? "english",
    isFree: data.isFree ?? data.price === 0,
    instructor: data.instructor ?? "Unknown",
    description: data.description ?? "No description available.",
    rating: data.rating ?? 4.5,
    enrolled: data.enrolled ?? 100,
    price: data.price ?? 0,
    oldPrice: data.oldPrice ?? 0,
    isBestSeller: data.isBestSeller ?? false,
    isFavorite: data.isFavorite ?? false,
  };
}

// Combine all sources and map to Course[]
const allCourses: Course[] = [
  ...coursesThatInspire.map(toCourse),
  ...popularCourses.map(toCourse),
  ...recommendedCourses.map(toCourse),
];

const filterOptions = {
  category: [
    { label: "Design", value: "design" },
    { label: "Development", value: "development" },
  ],
  difficulty: [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ],
  language: [
    { label: "English", value: "english" },
    { label: "Pashto", value: "pashto" },
    { label: "Dari", value: "dari" },
  ],
  price: [
    { label: "Free", value: "free" },
    { label: "Paid", value: "paid" },
  ],
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: [] as string[],
    difficulty: [] as string[],
    language: [] as string[],
    price: [] as string[],
  });

  // Optional: Add favorite toggle state if you want to control favorite
  const [coursesState, setCoursesState] = useState(allCourses);

  const toggleFavorite = (id: string) => {
    setCoursesState((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, isFavorite: !course.isFavorite }
          : course
      )
    );
  };

  const filteredCourses = coursesState.filter((course) => {
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(course.category.toLowerCase());

    const matchesDifficulty =
      filters.difficulty.length === 0 ||
      filters.difficulty.includes(course.difficulty.toLowerCase());

    const matchesLanguage =
      filters.language.length === 0 ||
      filters.language.includes(course.language.toLowerCase());

    const matchesPrice =
      filters.price.length === 0 ||
      (filters.price.includes("free") && course.isFree) ||
      (filters.price.includes("paid") && !course.isFree);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesLanguage &&
      matchesPrice
    );
  });

  // Helper: check if any filter is active (at least one value selected in any filter)
  const isAnyFilterActive = Object.values(filters).some(
    (arr) => arr.length > 0
  );

  // Hide header group if search is active or any filter is selected
  const hideHeaderGroup = searchQuery.length > 0 || isAnyFilterActive;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!hideHeaderGroup && (
          <View style={styles.headerGroup}>
            <Text style={styles.header}>Find best {"\n"}course for you</Text>
            <Text style={styles.subheader}>
              Your enrolled & saved courses in one place
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search courses, topics or instructors"
        />
        {/* Filters */}
        <View style={styles.filtersRow}>
          {["category", "language", "difficulty", "price"].map((key) => (
            <View style={styles.filterButtonWrap} key={key}>
              <FilterDropdown
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                options={filterOptions[key as keyof typeof filterOptions]}
                selectedValues={filters[key as keyof typeof filters]}
                onApply={(values) =>
                  setFilters((prev) => ({ ...prev, [key]: values }))
                }
              />
            </View>
          ))}
        </View>
        {/* Courses List */}
        <ScrollView contentContainerStyle={styles.coursesList}>
          {filteredCourses.length === 0 ? (
            <Text style={styles.noResults}>No courses found.</Text>
          ) : (
            filteredCourses.map((course) => (
              <CourseListCard
                key={course.id}
                imageUrl={course.imageUrl || ""}
                category={course.category}
                title={course.title}
                instructor={course.instructor}
                rating={course.rating || 0}
                enrolled={course.enrolled || 0}
                price={course.price || 0}
                oldPrice={course.oldPrice || 0}
                isBestSeller={course.isBestSeller || false}
                isFavorite={course.isFavorite || false}
                onPressFavorite={() => toggleFavorite(course.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 58,
    gap: 16,
  },
  header: {
    marginTop: 12,
    fontSize: 42,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "left",
  },
  subheader: {
    fontSize: 20,
    color: "#7f8c8d",
  },
  headerGroup: {
    gap: 4,
    marginBottom: 8,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonWrap: {},
  coursesList: {},
  noResults: {
    color: "#888",
    fontSize: 18,
    marginTop: 30,
    textAlign: "center",
  },
});
