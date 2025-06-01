import { useUserProfile } from "@/src/context/UserProfileContext";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const languages = ["English", "فارسی", "العربية"]; // Example

export default function SettingsScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUserProfile();

  // Toggle switches
  const [profileVisible, setProfileVisible] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [leaderboardAchievements, setLeaderboardAchievements] = useState(true);
  const [myCertificates, setMyCertificates] = useState(true);

  // Editable fields
  const [name, setName] = useState(profile.fullName);
  const [bio, setBio] = useState(profile.bio);

  // Optionally: handle change region, language selectors, etc.

  const handleSave = () => {
    updateProfile({
      fullName: name,
      bio,
      // Optionally: handle phone, email, region, avatar, etc
    });
    router.back();
  };

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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + Student badge */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarOuterCircle}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <View style={styles.studentBadge}>
              <Text style={styles.studentBadgeText}>Student</Text>
            </View>
          </View>
        </View>

        {/* Edit fields */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#C1C1CB"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Bio</Text>
        <View style={styles.textAreaWrap}>
          <TextInput
            style={styles.textArea}
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            placeholderTextColor="#C1C1CB"
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity>
            <Text style={styles.moreBtn}>More...</Text>
          </TouchableOpacity>
        </View>

        {/* Region */}
        <Text style={styles.label}>Regoin</Text>
        <View style={styles.regionRow}>
          <View style={styles.regionLeft}>
            <MaterialIcons name="my-location" size={21} color="#717585" />
            <Text style={styles.regionLabel}>{profile.region}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeBtn}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <LinearGradient
          colors={["#fff", "#FFEEF7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBtn}
        >
          <TouchableOpacity style={styles.premiumRow} activeOpacity={0.8}>
            <Feather
              name="key"
              size={20}
              color="#D16BA5"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.premiumLabel}>
              Subscribe to the premium version
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <SettingsRow
          icon={<Feather name="at-sign" size={20} color="#717585" />}
          label={profile.email}
          onPress={() => Linking.openURL("mailto:" + profile.email)}
          rightLabel="Change"
        />
        <SettingsRow
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#717585"
            />
          }
          label="Change Password"
          onPress={() => {}}
          rightLabel="Change"
        />
        <SettingsRow
          icon={<Feather name="phone" size={20} color="#717585" />}
          label={profile.phone}
          onPress={() =>
            Linking.openURL("tel:" + profile.phone.replace(/[^0-9+]/g, ""))
          }
          rightLabel="Change"
        />

        {/* App Appearance */}
        <Text style={styles.sectionTitle}>App Appearance</Text>
        <SettingsRow
          icon={<MaterialIcons name="settings" size={20} color="#717585" />}
          label="Appearance"
          rightLabel="Use Device Settings"
        />
        <SettingsRow
          icon={
            <MaterialCommunityIcons name="apps" size={20} color="#717585" />
          }
          label="App Icon"
          rightLabel="Default"
        />
        <SettingsRow
          icon={
            <MaterialCommunityIcons
              name="translate"
              size={20}
              color="#717585"
            />
          }
          label="Preferred App Language"
          rightLabel="English"
        />

        {/* Settings & Preferences */}
        <Text style={styles.sectionTitle}>Settings & Preferences</Text>
        <SettingsSwitchRow
          icon={<Feather name="eye" size={20} color="#717585" />}
          label="Others can see my Profile"
          value={profileVisible}
          onValueChange={setProfileVisible}
        />
        <SettingsSwitchRow
          icon={
            <Ionicons name="notifications-outline" size={20} color="#717585" />
          }
          label="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingsSwitchRow
          icon={<Feather name="bar-chart-2" size={20} color="#717585" />}
          label="Show Progress"
          value={showProgress}
          onValueChange={setShowProgress}
        />
        <SettingsSwitchRow
          icon={
            <MaterialCommunityIcons
              name="trophy-outline"
              size={20}
              color="#717585"
            />
          }
          label="Leaderboard Achievements"
          value={leaderboardAchievements}
          onValueChange={setLeaderboardAchievements}
        />
        <SettingsSwitchRow
          icon={<Feather name="award" size={20} color="#717585" />}
          label="My Certificates"
          value={myCertificates}
          onValueChange={setMyCertificates}
        />

        {/* Share section */}
        <Text style={styles.sectionTitle}>Share</Text>
        <SettingsRow
          icon={<Entypo name="app-store" size={20} color="#717585" />}
          label="Rate us on App Store"
          external
        />
        <SettingsRow
          icon={<Feather name="facebook" size={20} color="#717585" />}
          label="Follow us on Facebook"
          external
        />

        {/* Support section */}
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingsRow
          icon={<Feather name="help-circle" size={20} color="#717585" />}
          label="Help"
          external
        />
        <SettingsRow
          icon={<Feather name="file-text" size={20} color="#717585" />}
          label="Terms & Conditions"
          external
        />
        <SettingsRow
          icon={<Feather name="file-text" size={20} color="#717585" />}
          label="Privacy Policy"
          external
        />

        <View style={{ height: 40 }} />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Row for normal settings
const SettingsRow = ({
  icon,
  label,
  rightLabel,
  onPress,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  rightLabel?: string;
  onPress?: () => void;
  external?: boolean;
}) => (
  <TouchableOpacity
    style={styles.settingsRow}
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
  >
    <View style={styles.rowIconWrap}>{icon}</View>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={{ flex: 1 }} />
    {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
    {external && (
      <Feather
        name="external-link"
        size={19}
        color="#D16BA5"
        style={{ marginLeft: 8 }}
      />
    )}
  </TouchableOpacity>
);

// Row for a settings toggle
const SettingsSwitchRow = ({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) => (
  <View style={styles.settingsRow}>
    <View style={styles.rowIconWrap}>{icon}</View>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={{ flex: 1 }} />
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: "#EC407A", false: "#D9D9E2" }}
      thumbColor={value ? "#fff" : "#fff"}
    />
  </View>
);

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
    fontSize: 25,
    fontWeight: "600",
    color: "#293449",
    textAlign: "center",
    flex: 1,
    letterSpacing: 0.08,
  },
  headerRight: { width: 48, marginRight: 8 },
  avatarWrap: { alignItems: "center", marginTop: 14, marginBottom: 18 },
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
  label: {
    width: "100%",
    color: "#84849A",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    color: "#263042",
    borderWidth: 0,
    marginBottom: 20,
  },
  textAreaWrap: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 13,
    marginBottom: 22,
  },
  textArea: {
    minHeight: 55,
    maxHeight: 120,
    fontSize: 16,
    color: "#263042",
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 9,
    borderRadius: 13,
  },
  moreBtn: {
    color: "#4285F4",
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 17,
    marginBottom: 9,
  },
  regionRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 13,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  regionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 10,
  },
  regionLabel: {
    marginLeft: 7,
    fontSize: 15.5,
    color: "#2A3142",
    fontWeight: "600",
  },
  changeBtn: { fontSize: 15, color: "#D16BA5", fontWeight: "600" },
  sectionTitle: {
    width: "100%",
    fontSize: 16.5,
    fontWeight: "700",
    color: "#263042",
    marginTop: 10,
    marginBottom: 8,
    paddingLeft: 8,
    letterSpacing: 0.08,
  },
  gradientBtn: {
    borderRadius: 13,
    marginBottom: 13,
    overflow: "hidden",
    width: "100%",
  },
  premiumRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    width: "100%",
  },
  premiumLabel: {
    fontSize: 16,
    color: "#D16BA5",
    fontWeight: "700",
    letterSpacing: 0.11,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 18,
    width: "100%",
    marginBottom: 13,
  },
  rowIconWrap: {
    marginRight: 15,
    backgroundColor: "#F2F4FA",
    borderRadius: 8,
    padding: 6,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: { fontSize: 16, color: "#2A3142", fontWeight: "600" },
  rightLabel: {
    fontSize: 15,
    color: "#D16BA5",
    fontWeight: "600",
    marginLeft: 7,
  },
  saveBtn: {
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: "#EC407A",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 14,
    width: "100%",
    alignSelf: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.1,
  },
});
