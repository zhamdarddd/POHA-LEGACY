import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AdProps {
  title: string;
  publishedAt: string;
  body: string;
  category: string;
  imageUrl: string;
}

const AdvertisementCard: React.FC<AdProps> = ({
  title,
  publishedAt,
  body,
  category,
  imageUrl,
}) => {
  return (
    <View style={styles.adCard}>
      <Image source={{ uri: imageUrl }} style={styles.adImage} />

      <View style={styles.adContent}>
        <View style={styles.adHeader}>
          <Text style={styles.adTitle}>{title}</Text>
          <Text style={styles.adPublishedAt}>{publishedAt}</Text>
        </View>
        <Text style={styles.adBody}>{body}</Text>
        <View style={styles.adActions}>
          <TouchableOpacity style={styles.adTag}>
            <Text style={styles.adTagText}>{category}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adCta}>
            <Text style={styles.adCtaText}>Start Now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdvertisementCard;

const styles = StyleSheet.create({
  adCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "rgba(197, 0, 0, 0.6)",
    borderWidth: 2,
    overflow: "hidden",
    padding: 10,
    gap: 10,
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
  },
  adImage: {
    borderRadius: 12,
    width: 44,
    height: 44,
    borderStyle: "solid",
    borderColor: "#e5e5e5",
    borderWidth: 1,
  },
  adContent: {
    alignSelf: "stretch",
    paddingTop: 6,
    gap: 10,
    flex: 1,
  },
  adHeader: {
    alignSelf: "stretch",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "space-between",
  },
  adTitle: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "left",
  },
  adPublishedAt: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 600,
    color: "#9298a0",
  },
  adBody: {
    color: "#757575",
    fontSize: 16,
    textAlign: "left",
  },
  adActions: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  adTag: {},
  adTagText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#e74c3c",
    textAlign: "left",
  },
  adCta: {},
  adCtaText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#3a81f7",
    textAlign: "right",
  },
});
