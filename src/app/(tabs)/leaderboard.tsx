import {
  leaderboardData,
  LeaderboardDataByFilter,
  LeaderboardUser,
} from "@/src/assets/data/leaderboardData";
import { Filters } from "@/src/components/Leaderboard/Filters";
import { LeaderboardCountdown } from "@/src/components/Leaderboard/LeaderboardCountdown";
import { RankedUserList } from "@/src/components/Leaderboard/RankedUserList";
import { RankStatusBanner } from "@/src/components/Leaderboard/RankStatusBanner";
import { ShareRankButton } from "@/src/components/Leaderboard/ShareRankButton";
import TopThreePodium from "@/src/components/Leaderboard/TopThreePodium";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filterOptions = ["Region", "Month", "Week", "Day"] as const;
type LeaderboardFilterKey = "region" | "month" | "week" | "day";

function getCycleEnd(filterIndex: number) {
  const now = new Date();
  switch (filterIndex) {
    case 0:
    case 1:
      return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    case 2: {
      const dayDiff = 7 - now.getDay();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + dayDiff,
        0,
        0,
        0,
        0
      );
    }
    case 3:
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
    default:
      return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  }
}

function getLeaderboardDataByFilter(
  data: LeaderboardDataByFilter,
  filterIndex: number
): LeaderboardUser[] {
  const keys: LeaderboardFilterKey[] = ["region", "month", "week", "day"];
  const key = keys[filterIndex];
  return data[key] || [];
}

export default function LeaderboardScreen() {
  const [activeFilter, setActiveFilter] = useState(0);

  const filteredLeaderboardData: LeaderboardUser[] = useMemo(
    () => getLeaderboardDataByFilter(leaderboardData, activeFilter),
    [activeFilter]
  );
  const topThree = filteredLeaderboardData.slice(0, 3);
  const others = filteredLeaderboardData.slice(3);

  const currentUser = filteredLeaderboardData.find((u) => u.isCurrentUser);

  const percent = useMemo(() => {
    if (!currentUser || !filteredLeaderboardData.length) return 60;
    return Math.round(
      ((filteredLeaderboardData.length - (currentUser.rank - 1)) /
        filteredLeaderboardData.length) *
        100
    );
  }, [currentUser, filteredLeaderboardData]);

  const cycleEnd = useMemo(() => getCycleEnd(activeFilter), [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header
        <View style={styles.headerGroup}>
          <Text style={styles.header}>Leaderboard</Text>
          <Text style={styles.subheader}>
            See how you stack up against other learners!
          </Text>
        </View> */}
        {/* Filters */}
        <View style={styles.filtersRow}>
          <Filters
            options={filterOptions as unknown as string[]}
            activeIndex={activeFilter}
            onChange={setActiveFilter}
          />
        </View>
        {/* Banner Row */}
        <View style={styles.bannerRow}>
          <RankStatusBanner percentage={percent} />
          <LeaderboardCountdown cycleEnd={cycleEnd} />
        </View>
        {/* Podium */}
        <View style={styles.podiumGroup}>
          <TopThreePodium users={topThree} />
        </View>
        {/* Leaderboard List */}
        <View style={styles.leaderboardList}>
          <RankedUserList users={others} scrollEnabled={false} />
        </View>
        {/* Share Rank Button at the bottom, scrollable */}
        <View style={styles.footerContainer}>
          <ShareRankButton
            userName={currentUser?.name ?? ""}
            rank={currentUser?.rank ?? 0}
            points={currentUser?.points ?? 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: -18,
    paddingLeft: 14,
    paddingRight: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 58,
    gap: 16,
  },
  headerGroup: {
    gap: 4,
    marginBottom: 8,
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
  filtersRow: { width: "100%" },
  bannerRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  podiumGroup: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 12,
    zIndex: -1,
  },
  leaderboardList: {
    width: "100%",
    marginTop: -12,
    padding: 10,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    gap: 8,
  },
  footerContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
