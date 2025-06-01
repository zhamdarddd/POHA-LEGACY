import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CourseProps = {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  enrolled: number;
  price: number;
  oldPrice: number;
  isBestSeller: boolean;
  isFavorite: boolean;
  onPressFavorite?: () => void;
};

const CourseListCard: React.FC<CourseProps> = ({
  id,
  imageUrl,
  category,
  title,
  instructor,
  rating,
  enrolled,
  price,
  oldPrice,
  isBestSeller,
  isFavorite,
  onPressFavorite,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/CourseDetails/CourseDetailsScreen",
          params: { id },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {isBestSeller && (
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>Best Seller</Text>
          </View>
        )}
      </View>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.category}>{category}</Text>
          <TouchableOpacity style={styles.heartIcon} onPress={onPressFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#F24E1E" : "#A0A0A0"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.instructor}>{instructor}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" color="#FFD700" size={16} />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.enrolled}> • {enrolled} Enrolled</Text>
          </View>
          <View style={styles.priceRow}>
            {oldPrice > price && (
              <Text style={styles.oldPrice}>${oldPrice}</Text>
            )}
            <Text style={styles.price}> ${price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 12,
    padding: 10,
    shadowColor: "#222B45",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bestSellerBadge: {
    position: "absolute",
    bottom: 4,
    left: 4,
    backgroundColor: "#FFD700",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bestSellerText: {
    color: "#222B45",
    fontWeight: "bold",
    fontSize: 10,
  },
  details: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  category: {
    color: "#F24E1E",
    fontSize: 14,
    fontWeight: "500",
  },
  heartIcon: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 2,
    textAlign: "left",
  },
  instructor: {
    fontSize: 13,
    marginBottom: 2,
    color: "#525252",
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: "#222B45",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 14,
  },
  enrolled: {
    color: "#525252",
    fontSize: 13,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  oldPrice: {
    color: "#A0A0A0",
    textDecorationLine: "line-through",
    fontSize: 16,
    marginRight: 4,
  },
  price: {
    color: "#2D6AFF",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default CourseListCard;
