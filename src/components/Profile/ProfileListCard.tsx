import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// List card for certificates, saved, completed, downloaded courses
export interface ProfileListItem {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export const ProfileListCard: React.FC<{ items: ProfileListItem[] }> = ({
  items,
}) => (
  <View style={styles.list}>
    {items.map((item, idx) => (
      <TouchableOpacity
        key={item.label}
        style={[styles.item, idx !== 0 && { marginTop: 12 }]}
        activeOpacity={item.onPress ? 0.75 : 1}
        onPress={item.onPress}
      >
        <View style={styles.iconWrap}>{item.icon}</View>
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginTop: 12,
    marginBottom: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 13,
    paddingVertical: 17,
    paddingHorizontal: 18,
    width: "100%",
  },
  iconWrap: {
    marginRight: 15,
    backgroundColor: "#F2F4FA",
    borderRadius: 8,
    padding: 6,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#2A3142",
    fontWeight: "600",
  },
});
