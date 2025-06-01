import { coursesThatInspire } from "@/src/assets/data/coursesThatInspire";
import { popularCourses } from "@/src/assets/data/popularCourses";
import { recommendedCourses } from "@/src/assets/data/recommendedCourses";
import CourseListCard from "@/src/components/CourseListCard";
import { useMyCourses } from "@/src/context/MyCoursesContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";

import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;
const tabsList = ["Overview", "Lessons", "Review"] as const;

const benefits = [
  {
    icon: <Feather name="book" size={20} color="#606D7A" />,
    label: "25 Lessons",
  },
  {
    icon: <Feather name="monitor" size={20} color="#606D7A" />,
    label: "Access Mobile, Desktop & TV",
  },
  {
    icon: <FontAwesome5 name="signal" size={19} color="#606D7A" />,
    label: "Beginner Level",
  },
  {
    icon: <MaterialCommunityIcons name="infinity" size={22} color="#606D7A" />,
    label: "Lifetime Access",
  },
  {
    icon: (
      <MaterialCommunityIcons name="clipboard-text" size={20} color="#606D7A" />
    ),
    label: "100 Quizzes",
  },
  {
    icon: <Feather name="award" size={20} color="#606D7A" />,
    label: "Certificate of Completion",
  },
];

const lessonsData = [
  {
    section: "I - Introduction",
    items: [
      {
        id: "1",
        title: "Amet adipisicing consectetur",
        duration: "01:23 mins",
        status: "completed",
      },
      {
        id: "2",
        title: "Duis esse ipsum laboru",
        duration: "01:23 mins",
        status: "playing",
      },
      {
        id: "3",
        title: "Amet adipisicing consectetur",
        duration: "01:23 mins",
        status: "locked",
      },
    ],
  },
  {
    section: "III - Plan for your UX Research",
    items: [
      {
        id: "4",
        title: "Amet adipisicing consectetur",
        duration: "01:23 mins",
        status: "locked",
      },
      {
        id: "5",
        title: "Duis esse ipsum laboru",
        duration: "01:23 mins",
        status: "locked",
      },
      {
        id: "6",
        title: "Duis esse ipsum laboru",
        duration: "01:23 mins",
        status: "locked",
      },
    ],
  },
];

const reviewsSummary = {
  average: 4.5,
  totalReviews: 1200,
  ratings: [
    { stars: 5, percent: 60 },
    { stars: 4, percent: 35 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 5 },
  ],
};

const reviews = [
  {
    id: "r1",
    user: "Zahidullah Hamdard",
    avatar: "https://i.pravatar.cc/100",
    rating: 5,
    text: "The Course is Very Good dolor sit amet, consectetur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo",
    likes: 578,
    date: "2 Days Ago",
  },
  {
    id: "r2",
    user: "Zahidullah Hamdard",
    avatar: "https://i.pravatar.cc/100",
    rating: 5,
    text: "The Course is Very Good dolor sit amet, consectetur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo",
    likes: 578,
    date: "2 Days Ago",
  },
  {
    id: "r3",
    user: "Zahidullah Hamdard",
    avatar: "https://i.pravatar.cc/100",
    rating: 5,
    text: "The Course is Very Good dolor sit amet, consectetur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo",
    likes: 578,
    date: "2 Days Ago",
  },
];

export default function CourseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<"Overview" | "Lessons" | "Review">("Overview");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "I - Introduction",
    "III - Plan for your UX Research",
  ]);
  const [favorite, setFavorite] = useState<boolean | null>(null);
  const { addCourse } = useMyCourses();

  // For tab swipe logic
  const scrollRef = useRef<ScrollView>(null);
  const tabIdx = tabsList.findIndex((t) => t === tab);

  // When tab changes (via press), scroll to that page
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ x: windowWidth * tabIdx, animated: true });
  }, [tab]);

  // When user swipes, update active tab
  const onScroll = (event: any) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    if (tabsList[page] && tab !== tabsList[page]) setTab(tabsList[page]);
  };

  const allCourses = [
    ...popularCourses,
    ...recommendedCourses,
    ...coursesThatInspire,
  ];

  const course = useMemo(
    () => allCourses.find((c) => c.id === params.id),
    [params.id]
  );

  const similarCourses = allCourses
    .filter((c) => c.id !== course?.id)
    .slice(0, 4);

  const isFavorite = favorite !== null ? favorite : course?.isFavorite;

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Course not found.</Text>
      </View>
    );
  }

  const handleToggleSection = (section: string) => {
    setExpandedSections((current) =>
      current.includes(section)
        ? current.filter((s) => s !== section)
        : [...current, section]
    );
  };

  const handleToggleFavorite = () => {
    setFavorite((prev) => !(prev !== null ? prev : course.isFavorite));
  };

  const handleGetCourse = () => {
    addCourse(course); // Add to My Courses Active
    Alert.alert("Success", "Course added to My Courses!");
  };

  function Header() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          style={styles.headerBtn}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <Ionicons name="chevron-back" size={26} color="#293449" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Course Details
          </Text>
        </View>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel="Toggle favorite"
            style={{ marginRight: 6 }}
          >
            <Feather
              name={isFavorite ? "heart" : "heart"}
              size={24}
              color={isFavorite ? "#EC407A" : "#BDBDBD"}
              style={{ opacity: isFavorite ? 1 : 0.8 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Course Info"
          >
            <Ionicons
              name="information-circle-outline"
              size={25}
              color="#BDBDBD"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function ReviewSection() {
    return (
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionHeaderReviews}>Reviews:</Text>
        <View style={styles.reviewsSummaryBlockCustom}>
          <Text style={styles.studentsReviewsTitle}>Students Reviews</Text>
          <Text style={styles.studentsReviewsMeta}>
            1.2K reviews &#8226; 1K Ratings
          </Text>
          <View style={styles.starsSummaryRow}>
            <View style={styles.starsSummaryPill}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={20}
                  color="#FFC107"
                  style={{ marginHorizontal: 1 }}
                />
              ))}
              <Text style={styles.starsSummaryScore}>4.5 out of 5</Text>
            </View>
          </View>
          <View style={styles.starBarGroup}>
            {reviewsSummary.ratings.map((r, idx) => (
              <View key={r.stars} style={styles.starBarRow}>
                <Text style={styles.starBarLabel}>{r.stars} star</Text>
                <View style={styles.starBarBG}>
                  <View
                    style={[
                      styles.starBarFill,
                      {
                        width: `${r.percent}%`,
                        backgroundColor: r.stars === 5 ? "#FFC107" : "#E8ECFB",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.starBarPercent}>{r.percent}%</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View style={styles.reviewCard} key={review.id}>
              <Image
                source={{ uri: review.avatar }}
                style={styles.reviewAvatar}
                resizeMode="cover"
              />
              <View style={styles.reviewContent}>
                <View style={styles.reviewUserRow}>
                  <Text style={styles.reviewUserName}>{review.user}</Text>
                  <View style={styles.reviewStars}>
                    <View style={styles.reviewStarsBg}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={15}
                          color="#FFD600"
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
                <View style={styles.reviewMetaRow}>
                  <View style={styles.reviewLikesRow}>
                    <Ionicons name="heart" size={17} color="#EC407A" />
                    <Text style={styles.reviewLikes}>{review.likes}</Text>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />

      {/* Course Image */}
      <View style={styles.imageWrap}>
        <Image source={{ uri: course.imageUrl }} style={styles.image} />
        <View style={styles.overlayBox}>
          <Text style={styles.overlayCategory}>Figma UI UX Design</Text>
          <Text style={styles.overlayTitle}>
            Introduction to Design Principles
          </Text>
        </View>
      </View>

      {/* Course Title and Metadata */}
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>
          UX Foundation: Introduction to User Experience Design
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{course.rating}</Text>
          <Text style={styles.metaText}>({course.enrolled ?? 2450})</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>12 Lessons</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabsList.map((t, idx) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={styles.tabButton}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t }}
          >
            <Text style={[styles.tabText, tab === t && styles.tabActive]}>
              {t}
            </Text>
            {tab === t && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Horizontally swipeable and vertically scrollable content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onScroll}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Overview Tab */}
          <View style={{ width: windowWidth }}>
            <View style={styles.overviewContainer}>
              {/* Instructor */}
              <View style={styles.instructorRow}>
                <View style={styles.instructorAvatar}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    style={{ width: 50, height: 50, borderRadius: 16 }}
                  />
                </View>
                <View style={styles.instructorInfo}>
                  <Text style={styles.instructorName}>Zahidullah Hamdard</Text>
                  <Text style={styles.instructorRole}>Graphic Design</Text>
                </View>
                <TouchableOpacity style={styles.followBtn}>
                  <Text style={styles.followBtnText}>Follow</Text>
                </TouchableOpacity>
              </View>
              {/* Description */}
              <Text style={styles.sectionHeader}>Description</Text>
              <Text style={styles.descriptionText} numberOfLines={3}>
                Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum
                pulvinar non rutrum risus dui, risus. Purus massa velit iaculis
                tincidunt tortor, risus, scelerisque risus...
                <Text style={styles.seeMore}> See more</Text>
              </Text>
              {/* Benefits */}
              <Text style={styles.sectionHeader}>Benefits</Text>
              <View style={styles.benefitsList}>
                {benefits.map((benefit, idx) => (
                  <View style={styles.benefitRow} key={idx}>
                    {benefit.icon}
                    <Text style={styles.benefitLabel}>{benefit.label}</Text>
                  </View>
                ))}
              </View>
              {/* CourseListCard: Show similar courses */}
              <Text style={[styles.sectionHeader, { marginTop: 22 }]}>
                Similar Courses
              </Text>
              <View style={styles.similarCoursesList}>
                {similarCourses.map((c) => (
                  <CourseListCard
                    key={c.id}
                    {...c}
                    oldPrice={c.oldPrice ?? 0}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Lessons Tab */}
          <View style={{ width: windowWidth }}>
            <View style={styles.lessonsSection}>
              {lessonsData.map((section) => (
                <View key={section.section}>
                  <TouchableOpacity
                    onPress={() => handleToggleSection(section.section)}
                    style={styles.sectionHeaderLessons}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={
                      expandedSections.includes(section.section)
                        ? `Collapse ${section.section}`
                        : `Expand ${section.section}`
                    }
                  >
                    <Text style={styles.sectionHeaderText}>
                      {section.section}
                    </Text>
                    <Ionicons
                      name={
                        expandedSections.includes(section.section)
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={18}
                      color="#263042"
                    />
                  </TouchableOpacity>
                  {expandedSections.includes(section.section) &&
                    section.items.map((lesson, i) => (
                      <View
                        key={lesson.id}
                        style={[
                          styles.lessonRow,
                          lesson.status === "playing" && styles.lessonActive,
                          lesson.status === "completed" &&
                            styles.lessonCompleted,
                          lesson.status === "locked" && styles.lessonLocked,
                        ]}
                      >
                        <View style={styles.lessonIndexWrap}>
                          <Text style={styles.lessonIndex}>
                            {String(i + 1).padStart(2, "0")}
                          </Text>
                        </View>
                        <View style={styles.lessonInfo}>
                          <Text
                            style={[
                              styles.lessonTitle,
                              lesson.status === "locked" && {
                                color: "#B0B0B0",
                              },
                            ]}
                          >
                            {lesson.title}
                          </Text>
                          <Text style={styles.lessonDuration}>
                            {lesson.duration}
                          </Text>
                        </View>
                        {lesson.status === "completed" && (
                          <Ionicons
                            name="checkmark"
                            size={22}
                            color="#4CAF50"
                          />
                        )}
                        {lesson.status === "playing" && (
                          <Ionicons
                            name="play-circle"
                            size={22}
                            color="#EC407A"
                          />
                        )}
                        {lesson.status === "locked" && (
                          <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#B0B0B0"
                          />
                        )}
                      </View>
                    ))}
                </View>
              ))}
            </View>
          </View>

          {/* Review Tab */}
          <View style={{ width: windowWidth }}>
            <ReviewSection />
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceWrap}>
          <Text style={styles.priceText}>{course.price ?? 46}$</Text>
          <Text style={styles.discountText}>
            80% Discount. {course.oldPrice ?? 540}$
          </Text>
        </View>
        <TouchableOpacity
          style={styles.getCourseBtn}
          onPress={handleGetCourse}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Get Course"
        >
          <Text style={styles.getCourseBtnText}>Get Course</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 44 : 32,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 5,
    height: 58,
    borderBottomWidth: 0,
  },
  headerBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: -44,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222B45",
    textAlign: "center",
    letterSpacing: 0.1,
  },
  headerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 64,
    justifyContent: "flex-end",
  },
  imageWrap: {
    width: "100%",
    height: 175,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 0,
  },
  image: {
    width: windowWidth,
    height: 175,
    resizeMode: "cover",
  },
  overlayBox: {
    position: "absolute",
    left: 18,
    bottom: 18,
    backgroundColor: "rgba(38,48,66,0.85)",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxWidth: windowWidth - 40,
  },
  overlayCategory: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  overlayTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17.5,
    letterSpacing: 0.04,
  },
  courseInfo: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  courseTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222B45",
    marginBottom: 7,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  rating: {
    fontWeight: "700",
    marginLeft: 3,
    fontSize: 14.5,
    color: "#FFD600",
  },
  metaText: {
    color: "#B0B0B0",
    marginLeft: 6,
    fontSize: 14.5,
  },
  dot: {
    marginHorizontal: 8,
    color: "#B0B0B0",
    fontSize: 19,
    fontWeight: "700",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "#ECECF2",
    marginBottom: 0,
    height: 42,
    marginHorizontal: 6,
    marginTop: 3,
    backgroundColor: "#fff",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#A1A1A1",
    textAlign: "center",
    paddingVertical: 7,
    fontWeight: "500",
  },
  tabActive: {
    color: "#222B45",
    fontWeight: "700",
  },
  tabUnderline: {
    height: 2.5,
    width: 42,
    backgroundColor: "#222B45",
    borderRadius: 3,
    marginTop: 2,
    alignSelf: "center",
  },
  overviewContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#f1f1f1",
    overflow: "hidden",
    marginRight: 14,
  },
  instructorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  instructorName: {
    fontWeight: "700",
    color: "#263042",
    fontSize: 16.5,
  },
  instructorRole: {
    color: "#B0B0B0",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: "#F2F3F7",
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  followBtnText: {
    color: "#263042",
    fontWeight: "600",
    fontSize: 14,
  },
  sectionHeader: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222B45",
    marginTop: 15,
    marginBottom: 7,
    letterSpacing: 0.06,
  },
  descriptionText: {
    color: "#525252",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },
  seeMore: {
    color: "#A770EF",
    fontWeight: "600",
    fontSize: 14,
  },
  benefitsList: {
    marginVertical: 2,
    marginBottom: 10,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  benefitLabel: {
    marginLeft: 12,
    color: "#606D7A",
    fontSize: 15.5,
    fontWeight: "500",
  },
  similarCoursesList: {
    marginTop: 7,
    marginBottom: 10,
    gap: 12,
  },
  // Lessons tab styles
  lessonsSection: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 4,
  },
  sectionHeaderLessons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 18,
    justifyContent: "space-between",
  },
  sectionHeaderText: {
    fontSize: 17.5,
    fontWeight: "700",
    color: "#222B45",
    letterSpacing: 0.06,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 9,
    backgroundColor: "#F5F6FA",
    borderWidth: 1,
    borderColor: "transparent",
  },
  lessonActive: {
    borderColor: "#EC407A",
    backgroundColor: "#FFF0F7",
  },
  lessonCompleted: {},
  lessonLocked: {
    opacity: 0.65,
    backgroundColor: "#EBE9EE",
  },
  lessonIndexWrap: {
    backgroundColor: "#ECE9F7",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 12,
  },
  lessonIndex: {
    fontWeight: "700",
    color: "#A770EF",
    fontSize: 14.5,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: "600",
    fontSize: 15.5,
    color: "#263042",
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 13,
    color: "#A1A1A1",
  },
  // Review section
  reviewsSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionHeaderReviews: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222B45",
    marginBottom: 7,
    letterSpacing: 0.06,
  },
  reviewsSummaryBlock: {
    backgroundColor: "#F7F8FA",
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    elevation: 1,
    shadowColor: "#222B45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    alignItems: "center",
  },
  studentsReviewsTitle: {
    fontWeight: "700",
    fontSize: 15.5,
    color: "#263042",
    marginBottom: 3,
  },
  summaryStarsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  summaryAvgRatingText: {
    marginLeft: 8,
    fontWeight: "700",
    color: "#A770EF",
    fontSize: 13.8,
  },
  summaryBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  summaryBarLabel: {
    width: 44,
    color: "#969696",
    fontWeight: "500",
    fontSize: 13,
  },
  summaryBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
    marginHorizontal: 7,
    overflow: "hidden",
  },
  summaryBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  summaryBarPercent: {
    width: 32,
    color: "#969696",
    fontWeight: "500",
    fontSize: 13,
    textAlign: "right",
  },
  reviewsList: {
    marginTop: 6,
    marginBottom: 14,
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f1f1",
    shadowColor: "#222B45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
  },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#E2E2E2",
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewUserRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    flexWrap: "wrap",
  },
  reviewUserName: {
    fontWeight: "700",
    color: "#263042",
    fontSize: 15,
    marginRight: 8,
  },
  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F0FF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  reviewStarsBg: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    color: "#525252",
    fontSize: 14.5,
    fontWeight: "400",
    marginBottom: 7,
    marginTop: 1,
  },
  reviewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  reviewLikesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  reviewLikes: {
    color: "#EC407A",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 3,
  },
  reviewDate: {
    color: "#A0A0A0",
    fontSize: 13,
    fontWeight: "500",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ECE9F7",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#222B45",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
    }),
  },
  priceWrap: {
    flex: 1,
    justifyContent: "center",
  },
  priceText: {
    color: "#263042",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 3,
  },
  discountText: {
    color: "#A770EF",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.06,
  },
  getCourseBtn: {
    backgroundColor: "#EC407A",
    borderRadius: 15,
    paddingHorizontal: 28,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#EC407A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  getCourseBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16.5,
    letterSpacing: 0.15,
  },
  reviewsSummaryBlockCustom: {
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E4E8F0",
    shadowColor: "#D9E0F8",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    alignItems: "center",
  },
  studentsReviewsMeta: {
    color: "#A1A7C7",
    fontSize: 14.5,
    marginBottom: 7,
    fontWeight: "500",
    textAlign: "center",
  },
  starsSummaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 13,
  },
  starsSummaryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8ECFB",
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 5,
    alignSelf: "center",
    marginBottom: 2,
  },
  starsSummaryScore: {
    marginLeft: 10,
    fontWeight: "700",
    color: "#7A88B2",
    fontSize: 14.5,
  },
  starBarGroup: {
    marginTop: 4,
    width: "100%",
  },
  starBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    width: "100%",
  },
  starBarLabel: {
    width: 44,
    color: "#8187A2",
    fontWeight: "500",
    fontSize: 14,
  },
  starBarBG: {
    flex: 1,
    height: 8,
    backgroundColor: "#E8ECFB",
    borderRadius: 7,
    marginHorizontal: 7,
    overflow: "hidden",
  },
  starBarFill: {
    height: "100%",
    borderRadius: 7,
  },
  starBarPercent: {
    width: 30,
    color: "#8187A2",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "right",
  },
});
