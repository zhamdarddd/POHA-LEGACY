import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

interface Props {
  premium: ContactItem;
  email: ContactItem;
  phone: ContactItem;
}

export const AccountContactCard: React.FC<Props> = ({
  premium,
  email,
  phone,
}) => (
  <View style={styles.container}>
    <LinearGradient
      colors={["#fff", "#FFEEF7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBtn}
    >
      <TouchableOpacity
        style={styles.premiumRow}
        onPress={premium.onPress}
        activeOpacity={0.8}
      >
        <View style={styles.iconWrap}>{premium.icon}</View>
        <Text style={styles.premiumLabel}>{premium.label}</Text>
      </TouchableOpacity>
    </LinearGradient>
    <TouchableOpacity
      style={styles.row}
      onPress={email.onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrap}>{email.icon}</View>
      <Text style={styles.label}>{email.label}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.row}
      onPress={phone.onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrap}>{phone.icon}</View>
      <Text style={styles.label}>{phone.label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
  gradientBtn: {
    borderRadius: 13,
    marginBottom: 13,
    overflow: "hidden",
  },
  premiumRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    width: "100%",
  },
  iconWrap: {
    marginRight: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 6,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  premiumLabel: {
    fontSize: 16,
    color: "#D16BA5",
    fontWeight: "700",
    letterSpacing: 0.11,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 18,
    width: "100%",
    marginBottom: 13,
  },
  label: {
    fontSize: 16,
    color: "#2A3142",
    fontWeight: "600",
  },
});
