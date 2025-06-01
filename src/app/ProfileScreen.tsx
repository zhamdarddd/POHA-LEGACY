import { AccountContactCard } from "@/src/components/Profile/AccountContactCard";
import { LeaderboardStarsCard } from "@/src/components/Profile/LeaderboardStarsCard";
import { LearningReportCard } from "@/src/components/Profile/LearningReportCard";
import { ProfileListCard } from "@/src/components/Profile/ProfileListCard";
import { ProfileStatsCard } from "@/src/components/Profile/ProfileStatsCard";
import { ShareCoursesButton } from "@/src/components/Profile/ShareCoursesButton";
import { StreakCard } from "@/src/components/Profile/StreakCard";
import { useUserProfile } from "@/src/context/UserProfileContext";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useUserProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 16 }}
        >
          <Ionicons name="chevron-back" size={26} color="#293449" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.headerRight}
          activeOpacity={0.75}
          onPress={() => router.push("/SettingsScreen")}
        >
          <View style={styles.editCircle}>
            <FontAwesome6 name="pen-to-square" size={22} color="#D16BA5" />
            <LinearGradient
              colors={["#D16BA5", "#86A8E7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.editUnderline}
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarOuterCircle}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <View style={styles.studentBadge}>
              <Text style={styles.studentBadgeText}>Student</Text>
            </View>
          </View>
        </View>

        {/* Name & bio */}
        <Text style={styles.fullName}>{profile.fullName}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${profile.email}`)}
        >
          <Text style={styles.email}>{profile.email}</Text>
        </TouchableOpacity>

        {/* Stats Card */}
        <ProfileStatsCard
          totalPoints={profile.points}
          localRank={profile.localRank}
          lessons={profile.lessons}
        />

        {/* Streak card */}
        <StreakCard streakLabel="7-Days Streak" />

        {/* Share Courses Button */}
        <ShareCoursesButton
          userName={profile.fullName}
          courses={profile.lessons}
        />

        {/* Learning Report */}
        <LearningReportCard
          userName="Nice work, Keep it up!"
          period="Monthly"
          totalClasses={24}
          stats={[
            { value: "4+", label: "Certificates" },
            { value: "12", label: "Courses" },
            { value: "42+", label: "Hours" },
          ]}
        />

        {/* Profile List Cards */}
        <ProfileListCard
          items={[
            {
              icon: <Feather name="award" size={22} color="#717585" />,
              label: "Certificates",
              onPress: () => {},
            },
            {
              icon: <Feather name="bookmark" size={22} color="#717585" />,
              label: "Saved Courses",
              onPress: () => {},
            },
            {
              icon: <Feather name="check-square" size={22} color="#717585" />,
              label: "Completed Courses",
              onPress: () => {},
            },
            {
              icon: <Feather name="download" size={22} color="#717585" />,
              label: "Downloaded Courses",
              onPress: () => {},
            },
          ]}
        />

        {/* Leaderboard Stars */}
        <Text style={styles.sectionTitle}>Leaderboard Stars</Text>
        <LeaderboardStarsCard
          stars={[
            {
              icon: (
                <MaterialCommunityIcons
                  name="star-circle"
                  size={32}
                  color="#FFD600"
                />
              ),
              label: "02 Times Owned",
              owned: true,
            },
            {
              icon: (
                <MaterialCommunityIcons
                  name="star-circle-outline"
                  size={32}
                  color="#B0B0B0"
                />
              ),
              label: "05 Times Owned",
              owned: false,
            },
            {
              icon: (
                <MaterialCommunityIcons
                  name="star-circle-outline"
                  size={32}
                  color="#B0B0B0"
                />
              ),
              label: "06 Times Owned",
              owned: false,
            },
          ]}
        />

        {/* Account & Contact */}
        <Text style={styles.sectionTitle}>Account & Contact</Text>
        <AccountContactCard
          premium={{
            icon: <Feather name="key" size={20} color="#D16BA5" />,
            label: "Subscribe to the premium version",
            onPress: () => {},
          }}
          email={{
            icon: <Feather name="at-sign" size={20} color="#717585" />,
            label: profile.email,
            onPress: () => Linking.openURL("mailto:" + profile.email),
          }}
          phone={{
            icon: <Feather name="phone" size={20} color="#717585" />,
            label: profile.phone,
            onPress: () =>
              Linking.openURL("tel:" + profile.phone.replace(/[^0-9+]/g, "")),
          }}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FBFC" },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FBFC",
    paddingTop: 6,
    paddingBottom: 10,
    marginBottom: 4,
    minHeight: 68,
  },
  headerLeft: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#293449",
    textAlign: "center",
    flex: 1,
    letterSpacing: 0.1,
  },
  headerRight: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  editCircle: {
    backgroundColor: "#fff",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#E2B7E8",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 9,
    position: "relative",
  },
  editUnderline: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 13,
    height: 3,
    borderRadius: 2,
    opacity: 0.66,
  },
  avatarWrap: { alignItems: "center", marginTop: 14, marginBottom: 14 },
  avatarOuterCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#E0E7EF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#fff",
  },
  studentBadge: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: [{ translateX: -36 }],
    backgroundColor: "#fff",
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#EC407A",
    elevation: 2,
    shadowColor: "#A770EF",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  studentBadgeText: {
    fontSize: 13,
    color: "#A770EF",
    fontWeight: "700",
    letterSpacing: 0.12,
  },
  fullName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222B45",
    textAlign: "center",
    marginTop: 16,
  },
  bio: {
    fontSize: 16,
    color: "#4E5D6A",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 21,
  },
  email: {
    fontSize: 16,
    color: "#4285F4",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 0,
    marginBottom: 18,
  },
  sectionTitle: {
    width: "100%",
    fontSize: 17.5,
    fontWeight: "700",
    color: "#263042",
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 8,
    letterSpacing: 0.09,
  },
});
