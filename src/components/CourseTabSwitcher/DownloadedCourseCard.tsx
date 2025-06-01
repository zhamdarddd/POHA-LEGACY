import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Course } from "../../assets/data/types";

export type DownloadedState = "downloading" | "completed";

type DownloadedCourseCardProps = {
  course: Course;
  downloadProgress: number; // 0-100
  state: DownloadedState;
  onPauseDownload?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  onOpenCourse?: (courseId: string) => void;
};

const DownloadedCourseCard: React.FC<DownloadedCourseCardProps> = ({
  course,
  downloadProgress,
  state,
  onPauseDownload,
  onShare,
  onOpenCourse,
}) => {
  // Defensive: Don't render if course is missing or required fields are missing
  if (!course || !course.imageUrl || !course.title || !course.instructor)
    return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: course.imageUrl }} style={styles.image} />
        <View style={styles.courseInfo}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {course.title}
          </Text>
          <Text style={styles.instructor}>{course.instructor}</Text>
        </View>
        {state === "downloading" ? (
          <ActivityIndicator
            size="small"
            color="#EC407A"
            style={{ marginLeft: 8 }}
          />
        ) : (
          <TouchableOpacity
            style={styles.openIconTouch}
            onPress={() => onOpenCourse?.(course.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="open-in-new"
              size={22}
              color="#EC407A"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Progress Bar and Text */}
      <Text style={styles.downloadedText}>
        Course Downloaded {Math.round(downloadProgress)}%
      </Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${downloadProgress}%`,
              backgroundColor: "#EC407A",
            },
          ]}
        />
      </View>

      {/* Action Button */}
      <View style={styles.buttonRow}>
        {state === "downloading" ? (
          <TouchableOpacity
            style={styles.pauseButton}
            onPress={() => onPauseDownload?.(course.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.pauseButtonText}>Pause Download</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => onShare?.(course.id)}
            activeOpacity={0.85}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color="#EC407A"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.shareButtonText}>Share Course</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#f3b3db",
    padding: 14,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2c3e50",
  },
  instructor: {
    fontSize: 14,
    color: "#6e6e6e",
    marginVertical: 2,
  },
  openIconTouch: {
    padding: 3,
    borderRadius: 999,
  },
  downloadedText: {
    fontSize: 14,
    color: "#b17ebe",
    marginBottom: 4,
    fontWeight: "500",
  },
  progressBarBackground: {
    height: 7,
    borderRadius: 7,
    backgroundColor: "#E4E0E0",
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: 7,
    borderRadius: 7,
    backgroundColor: "#EC407A",
  },
  buttonRow: {
    marginTop: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  pauseButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    width: "100%",
  },
  pauseButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    letterSpacing: 0.1,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#EC407A",
    width: "100%",
    justifyContent: "center",
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EC407A",
    letterSpacing: 0.1,
  },
});

export default DownloadedCourseCard;
