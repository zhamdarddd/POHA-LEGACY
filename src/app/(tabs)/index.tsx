import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { adsData } from "@/src/assets/data/ads";
import { coursesThatInspire } from "@/src/assets/data/coursesThatInspire";
import { popularCourses } from "@/src/assets/data/popularCourses";
import { recommendedCourses } from "@/src/assets/data/recommendedCourses";

import { Course } from "@/src/assets/data/types";
import AdvertisementCard from "@/src/components/AdvertisementCard";
import CourseListCard from "@/src/components/CourseListCard";
import CourseThumbnailCard from "@/src/components/CourseThumbnailCard";
import { FilterDropdown } from "@/src/components/FilterDropdown";
import RecommendCoursesThumbnailCard from "@/src/components/RecommendCoursesThumbnailCard";
import SearchBar from "@/src/components/SearchBar";

import ChevronRightIcon from "../../assets/icons/chevronRightsvg.svg";

type Ad = {
  id: string;
  title: string;
  publishedAt: string;
  body: string;
  category: string;
  imageUrl: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  language?: string;
  isFree?: boolean;
};

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

// Defensive helper to ensure progress is always present
function ensureProgress(courses: Partial<Course>[]): Course[] {
  return courses.map((course) => ({
    ...course,
    progress: course.progress ?? 0,
  })) as Course[];
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    category: [] as string[],
    difficulty: [] as string[],
    language: [] as string[],
    price: [] as string[],
  });

  // Filtering ads - same as before
  const filteredAds = adsData.filter((ad: Ad) => {
    const matchesSearch =
      !searchQuery ||
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(ad.category.toLowerCase());

    const matchesDifficulty =
      filters.difficulty.length === 0 ||
      (ad.difficulty && filters.difficulty.includes(ad.difficulty));

    const matchesLanguage =
      filters.language.length === 0 ||
      (ad.language && filters.language.includes(ad.language.toLowerCase()));

    const matchesPrice =
      filters.price.length === 0 ||
      (ad.isFree !== undefined &&
        filters.price.includes(ad.isFree ? "free" : "paid"));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesLanguage &&
      matchesPrice
    );
  });

  // Helper to make course filtering work like in Explore
  function filterCourses(courses: Course[]): Course[] {
    return courses.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description &&
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(course.category?.toLowerCase?.());

      const matchesDifficulty =
        filters.difficulty.length === 0 ||
        (course.difficulty &&
          filters.difficulty.includes(course.difficulty.toLowerCase()));

      const matchesLanguage =
        filters.language.length === 0 ||
        (course.language &&
          filters.language.includes(course.language.toLowerCase()));

      const matchesPrice =
        filters.price.length === 0 ||
        (typeof course.isFree !== "undefined"
          ? (filters.price.includes("free") && course.isFree) ||
            (filters.price.includes("paid") && !course.isFree)
          : typeof course.price === "number"
          ? (filters.price.includes("free") && course.price === 0) ||
            (filters.price.includes("paid") && course.price > 0)
          : true);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesLanguage &&
        matchesPrice
      );
    });
  }

  // These states allow favorites toggling just like before
  const [popularCoursesState, setPopularCoursesState] = useState<Course[]>(
    ensureProgress(popularCourses)
  );
  const [recommendedCoursesState, setRecommendedCoursesState] = useState<
    Course[]
  >(ensureProgress(recommendedCourses));
  const [coursesThatInspireState, setCoursesThatInspireState] = useState<
    Course[]
  >(ensureProgress(coursesThatInspire));

  const toggleFavorite = (
    setter: React.Dispatch<React.SetStateAction<Course[]>>,
    state: Course[],
    id: string
  ) => {
    setter((prev: Course[]) =>
      prev.map((course: Course) =>
        course.id === id
          ? { ...course, isFavorite: !course.isFavorite }
          : course
      )
    );
  };

  // Filter each course array to support search/filters
  const filteredPopularCourses = filterCourses(popularCoursesState);
  const filteredRecommendedCourses = filterCourses(recommendedCoursesState);
  const filteredCoursesThatInspire = filterCourses(coursesThatInspireState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

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

      {/* Ads */}
      <View style={styles.adsList}>
        {filteredAds.map((ad) => (
          <AdvertisementCard key={ad.id} {...ad} />
        ))}
      </View>

      {/* Popular Courses */}
      <View style={styles.section}>
        <TouchableOpacity>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Courses</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filteredPopularCourses.map((course) => (
            <CourseThumbnailCard
              key={course.id}
              {...course}
              oldPrice={course.oldPrice ?? 0}
              onPressFavorite={() =>
                toggleFavorite(
                  setPopularCoursesState,
                  popularCoursesState,
                  course.id
                )
              }
            />
          ))}
        </ScrollView>
      </View>

      {/* Recommended Courses */}
      <View style={styles.section}>
        <TouchableOpacity>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recommended Courses</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filteredRecommendedCourses.map((course) => (
            <RecommendCoursesThumbnailCard
              key={course.id}
              {...course}
              oldPrice={course.oldPrice ?? 0}
              onPressFavorite={() =>
                toggleFavorite(
                  setRecommendedCoursesState,
                  recommendedCoursesState,
                  course.id
                )
              }
            />
          ))}
        </ScrollView>
      </View>

      {/* Courses That Inspire */}
      <View style={styles.listSection}>
        <TouchableOpacity>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Courses that Inspire</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredCoursesThatInspire.map((course) => (
            <CourseListCard
              key={course.id}
              {...course}
              oldPrice={course.oldPrice ?? 0}
              onPressFavorite={() =>
                toggleFavorite(
                  setCoursesThatInspireState,
                  coursesThatInspireState,
                  course.id
                )
              }
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonWrap: {},
  adsList: {},
  section: {
    marginVertical: 10,
  },
  listSection: {},
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#222B45",
  },
});
